import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';

@Component({
  selector: 'app-coronavirus-links',
  templateUrl: './coronavirus-links.component.html',
  styleUrls: ['./coronavirus-links.component.css']
})
export class CoronavirusLinksComponent implements OnInit {

  countries: any[] = COUNTRIES;
  constructor() { }

  ngOnInit(): void {
  }

}
