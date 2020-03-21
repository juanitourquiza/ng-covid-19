import { CountryPipe } from './../../../shared/pipes/country.pipe';
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
  dataRecovered$: Observable<any>;
  dataDeaths$: Observable<any>;
  dataConfirmed$: Observable<any>;
  mainStats$: Observable<MainStat>;
  mainStatsFrance$: Observable<MainStat>;
  detailedStats$: Observable<DetailedStat>;
  countries$: Observable<any>;
  selectedCountry: any = {Country: 'Monde', Slug: 'monde'};

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe
  ) { }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.mainStatsFrance$ = this.coronavirusService.getMainStatsFromNovel('France');
    this.mainStats$ = this.coronavirusService.getMainStats();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    this.countries$ = this.coronavirusService.getCountriesFromCovidApi();
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(): void {
    if (this.selectedCountry.Country === 'Monde') {
      this.mainStatsFrance$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStats();
      this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    } else if (this.selectedCountry.Country === 'France') {
      this.mainStatsFrance$ = undefined;
      this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry('France', 'recovered');
      this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry('France', 'deaths');
      this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry('France', 'confirmed');
      this.mainStats$ = this.coronavirusService.getMainStatsFromNovel('France');
      this.detailedStats$ = this.coronavirusService.getFranceStats();
    } else {
      this.mainStatsFrance$ = undefined;
      this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'recovered');
      this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'deaths');
      this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'confirmed');
      this.mainStats$ = this.coronavirusService.getMainStatsFromNovel(this.countryPipe.transform(this.selectedCountry.Country));
      this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(this.selectedCountry.Country);
    }

  }

  compareFn(optionOne, optionTwo): boolean {
    return optionOne.Country === 'Monde';
  }

}
