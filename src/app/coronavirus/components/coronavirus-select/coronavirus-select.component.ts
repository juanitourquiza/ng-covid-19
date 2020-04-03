import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { COUNTRIES } from "@coronavirus/constants/countries.constants";
import {
  FRANCE_REGIONS,
  FRANCE_DEPS
} from "@coronavirus/constants/france.constants";

@Component({
  selector: "app-coronavirus-select",
  templateUrl: "./coronavirus-select.component.html",
  styleUrls: ["./coronavirus-select.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusSelectComponent implements OnInit {
  /* Country */
  @Input() selectedCountry;
  filteredCountries: any[] = COUNTRIES;
  @Output() readonly selectCountryEvent: EventEmitter<
    string
  > = new EventEmitter<string>(true);

  /* Region */
  @Input() selectedRegion;
  filteredRegions: any[] = FRANCE_REGIONS;
  @Output() readonly selectRegionEvent: EventEmitter<string> = new EventEmitter<
    string
  >(true);

  /* Region */
  @Input() selectedDepartment;
  filteredDepartments: any[] = FRANCE_DEPS;
  @Output() readonly selectDepartmentEvent: EventEmitter<
    string
  > = new EventEmitter<string>(true);

  constructor() {}

  ngOnInit(): void {}

  selectCountry(): void {
    this.selectCountryEvent.emit(this.selectedCountry);
  }

  filterCountries(value: string) {
    let search = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!search) {
      this.filteredCountries = COUNTRIES;
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountries = COUNTRIES.filter(
      country =>
        country.translation
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(search) > -1
    );
  }

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne && optionTwo) {
      return optionOne.slug === optionTwo.slug;
    }
    return optionOne.slug === "monde";
  }

  selectRegion(): void {
    this.selectRegionEvent.emit(this.selectedRegion);
  }

  filterRegions(value: string) {
    let search = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!search) {
      this.filteredRegions = FRANCE_REGIONS;
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredRegions = FRANCE_REGIONS.filter(
      region =>
        region.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(search) > -1
    );
  }

  selectDepartment(): void {
    this.selectDepartmentEvent.emit(this.selectedDepartment);
  }

  filterDepartments(value: string) {
    let search = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!search) {
      this.filteredDepartments = FRANCE_DEPS;
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDepartments = FRANCE_DEPS.filter(
      department =>
        department.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(search) > -1
    );
  }

  // compareFnDepartment(optionOne, optionTwo): boolean {
  //   if (optionOne && optionTwo) {
  //     return optionOne.slug === optionTwo.slug;
  //   }
  //   return optionOne.slug === this.selectedDepartment.slug;
  // }

  trackByFn(index): void {
    return index;
  }
}
