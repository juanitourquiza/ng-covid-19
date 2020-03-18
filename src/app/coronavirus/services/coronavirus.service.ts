import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusService {

  private readonly url = 'https://covid19.mathdro.id/api';
  private readonly url2 = 'https://corona.lmao.ninja';
  private readonly urlGouv = 'https://www.data.gouv.fr/fr';

  constructor(private readonly httpClient: HttpClient) { }

  getCountries(): Observable<Map<string, string>> {
    return this.httpClient.get(`${this.url}/countries`).pipe(
      map((list: any) => {
        delete list.countries.France;
        return list.countries;
      }));
  }

  getMainStats(): Observable<MainStat> {
    return this.httpClient.get(`${this.url}`);
  }

  getMainStatsByCountries(country: string): Observable<MainStat> {
    return this.httpClient.get(`${this.url}/countries/${country}`);
  }

  getWorldDetailedStats(): Observable<DetailedStat> {
    return this.httpClient.get(`${this.url2}/countries`).pipe(
      map((list: any) =>
        list.map(item =>
          ({
            ...item,
            cases: item.cases,
            deathRate: ((item.deaths / item.cases) * 100).toFixed(1),
            recoveredRate: ((item.recovered / item.cases) * 100).toFixed(1)
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
            country: item.provinceState ? `${item.countryRegion} - ${item.provinceState}` : `${item.countryRegion}`,
            deathRate: ((item.deaths / item.confirmed) * 100).toFixed(1),
            recoveredRate: ((item.recovered / item.confirmed) * 100).toFixed(1)
          })))
    );
  }

  getFranceStats(): Observable<DetailedStat> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(`${this.urlGouv}/datasets/r/fa9b8fc8-35d5-4e24-90eb-9abe586b0fa5`, httpOptions).pipe(
      map((csv: any) => {
        const items: any = [];
        const data = Papa.parse(csv).data;
        data[0].map((item, index) => {
          if (index > 0) {
            items[index] = {
              country: item
            };
            data[Papa.parse(csv).data.length - 2].map((element, j) => {
              if (index === j) {
                items[index] = {
                  ...items[index],
                  cases: element
                };
              }
            });
            data[Papa.parse(csv).data.length - 3].map((element, j) => {
              if (index === j) {
                items[index] = {
                  ...items[index],
                  todayCases: items[index].cases - element
                };
              }
            });
          }
        });
        items.shift();
        return items;
      }));
  }

    getDailyDatas(): Observable<any> {
    return this.httpClient.get(`${this.url}/daily`);
  }

}
