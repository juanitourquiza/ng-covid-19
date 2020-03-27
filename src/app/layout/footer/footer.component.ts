import { Component } from '@angular/core';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  countries: any[] = COUNTRIES;
}
