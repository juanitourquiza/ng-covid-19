import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusComponent implements OnInit {

  data$: Observable<any>;
  mainStats$: Observable<MainStat>;
  mainStatsFrance$: Observable<MainStat>;
  detailedStats$: Observable<DetailedStat>;
  countries$: Observable<Map<string, string>>;
  selectedCountry = 'Monde';

  constructor(private readonly coronavirusService: CoronavirusService) { }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.mainStatsFrance$ = this.coronavirusService.getMainDetailedStatsByCountries('france');
    this.mainStats$ = this.coronavirusService.getMainStats();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    this.countries$ = this.coronavirusService.getCountries();
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(country: any): void {
    if (country === 'Monde') {
      this.selectedCountry = country;
      this.mainStatsFrance$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStats();
      this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    } else if (country === 'France') {
      this.selectedCountry = country;
      this.mainStatsFrance$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainDetailedStatsByCountries('france');
      this.detailedStats$ = this.coronavirusService.getFranceStats();
    } else {
      const countryValue = JSON.parse(country).value;
      this.selectedCountry = JSON.parse(country).key;
      this.mainStatsFrance$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStatsByCountries(countryValue);
      this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(countryValue);
    }

  }

}
