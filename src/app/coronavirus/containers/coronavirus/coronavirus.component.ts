import { Observable } from "rxjs";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CoronavirusService } from "@coronavirus/services/coronavirus.service";
import { DetailedStat, MainStat } from "@coronavirus/models/coronavirus.models";

@Component({
  selector: "app-coronavirus",
  templateUrl: "./coronavirus.component.html",
  styleUrls: ["./coronavirus.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusComponent implements OnInit {
  data$: Observable<any>;
  mainStats$: Observable<MainStat>;
  mainStatsEcuador$: Observable<MainStat>;
  detailedStats$: Observable<DetailedStat>;
  countries$: Observable<Map<string, string>>;
  selectedCountry = "Mundo";

  constructor(private readonly coronavirusService: CoronavirusService) {}

  ngOnInit(): void {
    this.data$ = this.coronavirusService.getDailyDatas();
    this.mainStatsEcuador$ = this.coronavirusService.getMainStatsByCountries(
      "EC"
    );
    this.mainStats$ = this.coronavirusService.getMainStats();
    this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    this.countries$ = this.coronavirusService.getCountries();
  }

  trackByFn(index): void {
    return index;
  }

  onSelectCountry(country: any): void {
    if (country === "Mundo") {
      this.selectedCountry = country;
      this.mainStatsEcuador$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStats();
      this.detailedStats$ = this.coronavirusService.getWorldDetailedStats();
    } else if (country === "Ecuador") {
      this.selectedCountry = country;
      this.mainStatsEcuador$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStatsByCountries("EC");
      this.detailedStats$ = this.coronavirusService.getEcuadorStats("EC");
    } else {
      const countryValue = JSON.parse(country).value;
      this.selectedCountry = JSON.parse(country).key;
      this.mainStatsEcuador$ = undefined;
      this.mainStats$ = this.coronavirusService.getMainStatsByCountries(
        countryValue
      );
      this.detailedStats$ = this.coronavirusService.getDetailedStatsByCountries(
        countryValue
      );
    }
  }
}
