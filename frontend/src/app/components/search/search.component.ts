import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	message:string = '';
	cityData = [];
	loading:boolean = false;
	constructor(
		public searchService:SearchService
	){ }

	ngOnInit() {
	}

  private showErrorMessage(msg) {
  	this.message = msg
		setTimeout(()=> {
			this.message = ''
		}, 3000)
  }

	async onFormSubmit(formData) {
		this.loading = true;
		const searchText = formData.value.city;
		if(!searchText) {
			this.showErrorMessage('Please enter the city name!')
			this.loading = false;
			return;
		}
		try {

			const fetchCityData = await this.searchService.fetchCityData(searchText).toPromise()
			this.cityData = fetchCityData.json();
			console.log(this.cityData);
		} catch(err) {
			this.showErrorMessage('Error fetching the data, please try some other keyword');
		}

		this.loading = false;
	}

}
