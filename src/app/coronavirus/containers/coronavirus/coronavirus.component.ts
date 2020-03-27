import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { CoronavirusService } from '@coronavirus/services/coronavirus.service';
import { DetailedStat, MainStat } from '@coronavirus/models/coronavirus.models';
import { isPlatformBrowser } from '@angular/common';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { CountryPipe } from '@shared/pipes/country.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

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
  tableStatsByCountry$: Observable<DetailedStat>;
  mainStatsFrance$: Observable<MainStat>;
  detailedStats$: Observable<DetailedStat>;

  countries: any[] = COUNTRIES;
  filteredCountries: any[] = [];
  selectedCountry: any = { country: 'Monde', slug: 'monde', translation: 'Monde', code: 'WL' };
  selectedTypeMap = 'cases';

  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
  }

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.filteredCountries = this.countries;
    this.route.params.subscribe(params => {
      if (!params.country) {
        this.initWorldDatas();
        this.initMetaTagWorld();
        return;
      }
      this.selectedCountry = this.countries.find((country) => country.slug === params.country);
      if (this.selectedCountry.country === 'Monde') {
        this.initWorldDatas();
        this.initMetaTagWorld();
      } else if (this.selectedCountry.country === 'France') {
        this.initFranceDatas();
        this.initMetaTagCountry();
      } else {
        this.initCountryDatas();
        this.initMetaTagCountry();
      }
    });
  }

  onUpdateMapEvent($event: string) {
    this.selectedTypeMap = $event;
  }

  filterCountries(value: string) {
    let search = value;
    if (!search) {
      this.filteredCountries = this.countries;
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountries = this.countries.filter(country => country.translation.toLowerCase().indexOf(search) > -1);
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

  private initMetaTagWorld(): void {
    this.title.setTitle('Cas Coronavirus - suivez le COVID-19 en France et dans le monde');
    const tags = [
      { name: 'description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:title', content: 'Cas Coronavirus - suivez le COVID-19 en France et dans le monde' },
      { name: 'og:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde' },
      { name: 'twitter:description', content: 'Cas de Coronavirus COVID-19 - Suivez les cas et morts du virus en France et dans le monde entier : Chine, Italie, Espagne avec des statistiques détaillées et une carte en temps réel' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagCountry(): void {
    this.title.setTitle(`Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}`);
    const tags = [
      { name: 'description', content: `Cas de Coronavirus COVID-19 ${this.selectedCountry.translation} - Suivez les cas et morts du virus avec des statistiques détaillées en temps réel` },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: `https://www.cascoronavirus.fr/stats/${this.selectedCountry.slug}` },
      { name: 'og:title', content: `Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}` },
      { name: 'og:description', content: `Suivez les cas et morts du Coronavirus COVID-19 en ${this.selectedCountry.translation} avec des graphs et statistiques détaillées` },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `Cas Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}` },
      { name: 'twitter:description', content: `Suivez les cas et morts du Coronavirus COVID-19 en ${this.selectedCountry.translation} avec des graphs et statistiques détaillées` },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

  private initWorldDatas(): void {

    /* Disable stat france*/
    this.mainStatsFrance$ = undefined;

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }

  private initFranceDatas(): void {
     /* Disable stat france*/
    this.mainStatsFrance$ = undefined;

    /* Graph page pays en bas */
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry('France', 'recovered');
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry('France', 'deaths');
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry('France', 'confirmed');

    /* Tableau page pays */
    this.tableStatsByCountry$ = this.coronavirusService.getFranceStats();

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }

  private initCountryDatas(): void {
    this.mainStatsFrance$ = undefined;

    /* Graph page pays en bas */
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'recovered');
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'deaths');
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(this.selectedCountry.slug, 'confirmed');

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();

    /* Tableau page pays */
    this.tableStatsByCountry$ = this.coronavirusService.getDetailedStatsByCountries(this.selectedCountry.code);
  }

}
