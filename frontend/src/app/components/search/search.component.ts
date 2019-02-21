import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	message:string = '';
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

	onFormSubmit(formData) {

		const searchText = formData.value.city;
		if(!searchText) {
			this.showErrorMessage('Please enter the city name!')
			return;
		}
		this.searchService.fetchCityData(searchText)
	}

}
