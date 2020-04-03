import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceAgeService {

  private readonly urlCSVAge = 'https://api-novel-coronavirus.herokuapp.com/france-datas-age/';

  constructor(private readonly httpClient: HttpClient) { }

  getFranceDataByAge(): Observable<any> {
    return this.httpClient.get(this.urlCSVAge);
  }
}
