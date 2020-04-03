import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/* To Rework */
@Injectable({
  providedIn: 'root'
})
export class CoronavirusFranceService {

  private readonly urlCSVDepartment = 'https://api-novel-coronavirus.herokuapp.com/france-datas/';

  constructor(private readonly httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get(this.urlCSVDepartment);
  }

}
