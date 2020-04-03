import {
  FRANCE_REGIONS,
  FRANCE_DEPS
} from "@coronavirus/constants/france.constants";
import { CoronavirusFranceService } from "@coronavirus/services/coronavirus-france.service";
import { Observable } from "rxjs";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from "@angular/core";
import { CoronavirusService } from "@coronavirus/services/coronavirus.service";
import { DetailedStat } from "@coronavirus/models/coronavirus.models";
import { isPlatformBrowser } from "@angular/common";
import { COUNTRIES } from "@coronavirus/constants/countries.constants";
import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { CoronavirusFranceAgeService } from "@coronavirus/services/coronavirus-france-age.service";
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
  tableStatsByCountry$: Observable<DetailedStat>;
  detailedStats$: Observable<DetailedStat>;

  franceStats$: Observable<any>;
  franceStatsByAge$: Observable<any>;

  //Se inicia con el mundo en la carga de datos
  selectedCountry: any = COUNTRIES[0];
  selectedDivisionMap = "regionFrance";
  selectedRegion: any;
  selectedDepartment: any;
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly coronavirusService: CoronavirusService,
    private readonly coronavirusFranceService: CoronavirusFranceService,
    private readonly coronavirusFranceAgeService: CoronavirusFranceAgeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {}

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.route.params.subscribe(params => {
      if (!params.country) {
        this.initFranceDatas();
        this.initMetaTagCountry();
        return;
      }
      this.selectedCountry = COUNTRIES.find(
        country => country.slug === params.country
      );
      if (this.selectedCountry.country === "Monde") {
        this.initWorldDatas();
        this.initMetaTagWorld();
        return;
      }
      if (this.selectedCountry.country === "France") {
        this.initFranceDatas();
        this.initMetaTagCountry();

        if (params.region) {
          this.selectedRegion = FRANCE_REGIONS.find(
            region => region.slug === params.region
          );
          this.initMetaTagRegionAndDepartment(this.selectedRegion, "la région");
        }
        if (params.department) {
          this.selectedDepartment = FRANCE_DEPS.find(
            department => department.slug === params.department
          );
          this.initMetaTagRegionAndDepartment(
            this.selectedDepartment,
            "le département"
          );
        }
      }
      this.initCountryDatas();
      this.initMetaTagCountry();
    });
  }

  onSelectCountry(country: any): void {
    this.selectedCountry = country;
    this.selectedRegion = undefined;

    this.router.navigate(["stats", this.selectedCountry.slug]);
  }

  onSelectRegion(region: any): void {
    this.selectedRegion = region;
    this.selectedDepartment = undefined;
    this.router.navigate([
      "stats",
      this.selectedCountry.slug,
      "region",
      this.selectedRegion.slug
    ]);
  }

  onSelectDepartment(department: any): void {
    this.selectedDepartment = department;
    this.selectedRegion = undefined;
    this.router.navigate([
      "stats",
      this.selectedCountry.slug,
      "departement",
      this.selectedDepartment.slug
    ]);
  }

  private initMetaTagWorld(): void {
    this.title.setTitle("Casos Coronavirus");
    const tags = [
      {
        name: "description",
        content: "Casos Coronavirus"
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      { name: "og:url", content: "https://casoscovid19.com/" },
      {
        name: "og:title",
        content: "Casos Coronavirus"
      },
      {
        name: "og:description",
        content: "Casos Coronavirus"
      },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content:
          "Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde"
      },
      {
        name: "twitter:description",
        content: "Casos Coronavirus"
      },
      {
        name: "twitter:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagCountry(): void {
    this.title.setTitle(
      `Casos Coronavirus ${this.selectedCountry.translation} - suivez le COVID-19 en ${this.selectedCountry.translation}`
    );
    const tags = [
      {
        name: "description",
        content: `Casos de Coronavirus COVID-19 ${this.selectedCountry.translation}`
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: `https://casoscovid19.com/stats/${this.selectedCountry.slug}`
      },
      {
        name: "og:title",
        content: `Casos Coronavirus ${this.selectedCountry.translation} - en ${this.selectedCountry.translation}`
      },
      {
        name: "og:description",
        content: `Casos Coronavirus en ${this.selectedCountry.translation}`
      },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: `Casos Coronavirus ${this.selectedCountry.translation} - en ${this.selectedCountry.translation}`
      },
      {
        name: "twitter:description",
        content: `Casos Coronavirus en ${this.selectedCountry.translation}`
      },
      {
        name: "twitter:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  private initMetaTagRegionAndDepartment(region: any, type: string): void {
    this.title.setTitle(`Casos Coronavirus ${region.name} en ${region.name}`);
    const tags = [
      {
        name: "description",
        content: `Casos Coronavirus ${region.name} en ${type} ${region.name}`
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: `https://casoscovid19.com/stats/${region.slug}`
      },
      {
        name: "og:title",
        content: `Casos Coronavirus ${region.name} - suivez le COVID-19 en ${region.name}`
      },
      {
        name: "og:description",
        content: `Casos Coronavirus ${region.name} - en ${type} ${region.name}`
      },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: `Casos Coronavirus ${region.name} - en ${region.name}`
      },
      {
        name: "twitter:description",
        content: `Casos Coronavirus ${region.name} - en ${type} ${region.name}`
      },
      {
        name: "twitter:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }

  private initWorldDatas(): void {
    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
  }

  private initFranceDatas(): void {
    /* For map and table */
    this.franceStats$ = this.coronavirusFranceService.getData();

    /* For main stats */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();

    /* Age */
    this.franceStatsByAge$ = this.coronavirusFranceAgeService.getFranceDataByAge();
  }

  private initCountryDatas(): void {
    /* Graph page footer */
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

    /* For stats and map */
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();

    /* Table page country */
    if (this.selectedCountry.country === "US") {
      this.tableStatsByCountry$ = this.coronavirusService.getUsaDatas();
      return;
    }
    this.tableStatsByCountry$ = this.coronavirusService.getDetailedStatsByCountries(
      this.selectedCountry.code
    );
  }
}
