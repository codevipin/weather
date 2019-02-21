const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.get('/search', async (req, res) => {

	const queryString = req.query.q;
	console.log(`https://geocode.xyz/?locate=${queryString}&json=1`);
	try {
		//Fetch lat and lng for the seached city
		const response = await fetch(`https://geocode.xyz/?locate=${queryString}&json=1&auth=168642536253164193543x1852`);
		const {longt, latt} = await response.json();
		if(!Number(longt) || !Number(latt)) {
			throw 'Longitude or latidude not found for this location';
		}


	} catch(error) {
		console.log("Error fetching the data", error);
		res.send(error);
	}
})
app.listen(4000, ()=>{
	console.log("listening...");
})