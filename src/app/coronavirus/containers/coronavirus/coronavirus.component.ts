import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { CountryPipe } from '@shared/pipes/country.pipe';
import { Router, ActivatedRoute } from '@angular/router';

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
  countries: any[] = COUNTRIES;
  selectedCountry: any = { Country: 'Monde', Slug: 'monde' };
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe,
    private readonly router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.route.params.subscribe(params => {
      if (params.country) {
        this.selectedCountry = this.countries.find((country) => country.Slug === params.country);
        if (params.country === 'monde') {
          this.initWorldDatas();
        } else if (params.country === 'france') {
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
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'recovered');
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'deaths');
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.Slug, 'confirmed');
    this.mainStats$ = this.coronavirusService.getMainStatsFromNovel(this.countryPipe.transform(this.selectedCountry.Country));
    this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(this.selectedCountry.Country);
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(): void {
    this.router.navigate(['pays', this.selectedCountry.Slug]);
  }

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne && optionTwo) {
      return optionOne.Slug === optionTwo.Slug;
    }
    return optionOne.Slug === 'monde';
  }

}
