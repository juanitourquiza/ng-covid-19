import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailedStat } from '@coronavirus/models/coronavirus.models';
import { map } from 'rxjs/operators';
import { COUNTRIES_DICTIONARY } from '@coronavirus/constants/country-dictionary.constants';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusService {

  private readonly url = 'https://covid19.mathdro.id/api';
  private readonly url2 = 'https://api-novel-coronavirus.herokuapp.com';
  private readonly urlCovidApi = 'https://api.covid19api.com';

  constructor(private readonly httpClient: HttpClient) { }


  getWorldDetailedStats(): Observable<DetailedStat> {
    return this.httpClient.get(`${this.url2}/countries`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            code: item.countryInfo.iso2,
            cases: item.cases,
            deathRate: ((item.deaths / item.cases) * 100).toFixed(1),
            recoveredRate: ((item.recovered / item.cases) * 100).toFixed(1),
            translation: !COUNTRIES_DICTIONARY[item.countryInfo.iso2] ? item.country : COUNTRIES_DICTIONARY[item.countryInfo.iso2]
          })))
    );
  }

  getDetailedStatsByCountries(country: string): Observable<DetailedStat> {
    return this.httpClient.get(`${this.url}/countries/${country}/confirmed`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            todayCases: '',
            cases: item.confirmed,
            todayDeaths: '',
            code: country,
            translation: COUNTRIES_DICTIONARY[country],
            provinceState: item.provinceState,
            country: item.countryRegion,
            deathRate: ((item.deaths / item.confirmed) * 100).toFixed(1),
            recoveredRate: ((item.recovered / item.confirmed) * 100).toFixed(1)
          })))
    );
  }

  getDailyDatas(): Observable<any> {
    return this.httpClient.get(`${this.url}/daily`);
  }

  getDailyDatasByCountry(country: string, status: string): Observable<any> {
    return this.httpClient.get(`${this.urlCovidApi}/total/country/${country}/status/${status}`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            date: item.Date,
            totalCases: item.Cases,
          })))
    );
  }

  getUsaDatas(): Observable<any> {
    return this.httpClient.get(`${this.url2}/states`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            translation: item.state,
            deathRate: ((item.deaths / item.cases) * 100).toFixed(1),
            recovered: ''
          })))
    );
  }

}
