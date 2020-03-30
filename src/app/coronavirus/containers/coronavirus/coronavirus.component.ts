import { Observable } from "rxjs";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from "@angular/core";
import { CoronavirusService } from "@coronavirus/services/coronavirus.service";
import { DetailedStat, MainStat } from "@coronavirus/models/coronavirus.models";
import { isPlatformBrowser } from "@angular/common";
import { COUNTRIES } from "@coronavirus/constants/countries.constants";
import { CountryPipe } from "@shared/pipes/country.pipe";
import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-coronavirus",
  templateUrl: "./coronavirus.component.html",
  styleUrls: ["./coronavirus.component.scss"],
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
  filteredCountries: any[] = [];
  selectedCountry: any = {
    country: "Monde",
    slug: "monde",
    translation: "Mundo"
  };
  selectedTypeMap = "cases";

  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly countryPipe: CountryPipe,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {}

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.filteredCountries = this.countries;
    this.route.params.subscribe(params => {
      if (!params.country) {
        this.initWorldDatas();
        this.initMetaTagWorld();
        this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
        this.mainStats$ = this.coronavirusService.getMainStats();
        return;
      }
      this.selectedCountry = this.countries.find(
        country => country.slug === params.country
      );
      if (this.selectedCountry.country === "Monde") {
        this.initWorldDatas();
        this.initMetaTagWorld();
      } else if (this.selectedCountry.country === "France") {
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
    this.filteredCountries = this.countries.filter(
      country => country.translation.toLowerCase().indexOf(search) > -1
    );
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(): void {
    this.router.navigate(["stats", this.selectedCountry.slug]);
  }

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne && optionTwo) {
      return optionOne.slug === optionTwo.slug;
    }
    return optionOne.slug === "monde";
  }

  private initMetaTagWorld(): void {
    this.title.setTitle("Casos de COVID-19");
    const tags = [
      {
        name: "description",
        content: "Casos de COVID-19"
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      { name: "og:url", content: "https://casoscovid19.com/" },
      {
        name: "og:title",
        content: "Casos de COVID-19"
      },
      {
        name: "og:description",
        content: "Casos de COVID-19"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: "Casos de COVID-19"
      },
      {
        name: "twitter:description",
        content: "Casos de COVID-19"
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagCountry(): void {
    this.title.setTitle(
      `Casos COVID-19 ${this.selectedCountry.translation} - en ${this.selectedCountry.translation}`
    );
    const tags = [
      {
        name: "description",
        content: `Casos de COVID-19 ${this.selectedCountry.translation}`
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: `https://casoscovid19.com//stats/${this.selectedCountry.slug}`
      },
      {
        name: "og:title",
        content: `Casos de COVID-19 ${this.selectedCountry.translation} en ${this.selectedCountry.translation}`
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  private initWorldDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.mainStats$ = this.coronavirusService.getMainStats();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }

  private initFranceDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(
      "France",
      "recovered"
    );
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(
      "France",
      "deaths"
    );
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(
      "France",
      "confirmed"
    );
    this.mainStats$ = this.coronavirusService.getMainStatsFromNovel("FR");
    this.detailedStats$ = this.coronavirusService.getFranceStats();
  }

  private initCountryDatas(): void {
    this.mainStatsFrance$ = undefined;
    this.dataRecovered$ = this.coronavirusService.getDailyDatasByCountry(
      this.selectedCountry.slug,
      "recovered"
    );
    this.dataDeaths$ = this.coronavirusService.getDailyDatasByCountry(
      this.selectedCountry.slug,
      "deaths"
    );
    this.dataConfirmed$ = this.coronavirusService.getDailyDatasByCountry(
      this.selectedCountry.slug,
      "confirmed"
    );
    this.mainStats$ = this.coronavirusService.getMainStatsFromNovel(
      this.selectedCountry.code
    );
    this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(
      this.selectedCountry.code
    );
  }
}
