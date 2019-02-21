import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  fetchCityData(searchText) {
  	console.log("ALl set to fetch data!!", searchText)
  }
}
