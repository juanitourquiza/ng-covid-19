import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { CountryPipe } from '@shared/pipes/country.pipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coronavirus',
  templateUrl: './coronavirus.component.html',
  styleUrls: ['./coronavirus.component.scss'],
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
  countries: any[] = COUNTRIES;
  selectedCountry: any = { country: 'Monde', slug: 'monde', translation: 'Monde' };
  selectedTypeMap = 'cases';
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.route.params.subscribe(params => {
      if (params.country) {
        this.selectedCountry = this.countries.find((country) => country.slug === params.country);
        if (this.selectedCountry.country === 'Monde') {
          this.initWorldDatas();
        } else if (this.selectedCountry.country === 'France') {
          this.initFranceDatas();
        } else {
          this.initCountryDatas();
        }
      } else {
        this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
        this.mainStats$ = this.coronavirusService.getMainStats();
      }
    });
  }

  onUpdateMapEvent($event: string) {
    this.selectedTypeMap = $event;
  }

  private initWorldDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.mainStats$ = this.coronavirusService.getMainStats();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }

  private initFranceDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry('France', 'recovered');
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry('France', 'deaths');
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry('France', 'confirmed');
    this.mainStats$ = this.coronavirusService.getMainStatsFromNovel('France');
    this.detailedStats$ = this.coronavirusService.getFranceStats();
  }

  private initCountryDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'recovered');
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'deaths');
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'confirmed');
    this.mainStats$ = this.coronavirusService.getMainStatsFromNovel(this.countryPipe.transform(this.selectedCountry.country));
    this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(this.selectedCountry.country);
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(): void {
    this.router.navigate(['stats', this.selectedCountry.slug]);
  }

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne && optionTwo) {
      return optionOne.slug === optionTwo.slug;
    }
    return optionOne.slug === 'monde';
  }

}
