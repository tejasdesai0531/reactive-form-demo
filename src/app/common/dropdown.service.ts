import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getCountryList(): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + 'country')
  }

  getStateList(countryId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + `state?countryId=${countryId}`)
  }

  getCityList(stateId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + `city?stateId=${stateId}`)
  }
}
