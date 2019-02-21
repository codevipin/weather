import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:Http) { }

  fetchCityData(searchText) {
  	 return this.http.get(`http://localhost:4000/search?q=${searchText}`)
  }
}
