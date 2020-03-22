import { CountryPipe } from './../../../shared/pipes/country.pipe';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

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
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly meta: Meta,
    private readonly titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Covid-19 : Suivez en temps réel le virus du coronavirus dans le monde');
    this.meta.addTag({
      name: 'Covid-19',
      content: 'Covid-19 coronavirus'
    });
    this.meta.updateTag(
      {
        name: 'description',
        content: `Covid-19 : suivez le coronavirus en temps réel dans
        le monde avec des statistiques dans le monde et dans les pays comme la France, Chine, Italie`
      });
    this.data$ = this.coronavirusService.getDailyDatas();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    this.mainStats$ = this.coronavirusService.getMainStats();
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
