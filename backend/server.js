const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {

	const queryString = req.query.q;
	try {
		//Fetch lat and lng for the seached city
		const cityLatLng = await fetch(`https://geocode.xyz/?locate=${queryString}&json=1&auth=168642536253164193543x1852`);
		const {longt, latt} = await cityLatLng.json();
		if(!Number(longt) || !Number(latt)) {
			throw 'Longitude or latidude not found for this location';
		}

		//Find the list of cities close to the location provided
		const fetchCloseLocations = await fetch(`https://www.metaweather.com/api/location/search/?lattlong=${latt},${longt}`);
		const closeLocationArr = await fetchCloseLocations.json();

		//Merge the wheather report for all the nearby location
		const mergeWeatherData = await Promise.all(
			closeLocationArr.map(async location=> {

				const fetchWeatherDetail =  await fetch(`https://www.metaweather.com/api/location/${location.woeid}/`);
				const { consolidated_weather } = await fetchWeatherDetail.json();
				//[Note] Since the response array is really big,
				// I have selected the first weather status
				location.consolidated_weather = consolidated_weather[0]
				return location;
			})
		);

		// Merge the onwater status for all the fetched locations
		const mergeOnWaterStatus = await Promise.all(
			mergeWeatherData.map(async location=> {
				console.log(location.latt_long);
				const fetchOnWaterStatus = await fetch(`https://api.onwater.io/api/v1/results/${location.latt_long}`);
				const { water } = await fetchOnWaterStatus.json();
				location.water = water;
				return location;
			})
		)

		//All done, send the response
		res.send(mergeOnWaterStatus)
		
	} catch(error) {
		console.log("Error fetching the data", error);
		res.send(error);
	}
})
app.listen(4000, ()=>{
	console.log("listening...");
})