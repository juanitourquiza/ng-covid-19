import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef,
  SimpleChange,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_franceHigh from "@amcharts/amcharts4-geodata/franceHigh";
import am4geodata_franceDepartmentsHigh from "@amcharts/amcharts4-geodata/franceDepartmentsHigh";
import am4geodata_lang_FR from "@amcharts/amcharts4-geodata/lang/ES";
am4core.useTheme(am4themes_animated);

export interface ThemeColor {
  min: string;
  max: string;
  fill: string;
  hover: string;
}

@Component({
  selector: "app-coronavirus-map",
  templateUrl: "./coronavirus-map.component.html",
  styleUrls: ["./coronavirus-map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges {
  @Input() detailedStats;
  @Input() selectedDivisionMap;
  @Input() selectedCountry;
  @ViewChild("chartElement", { static: true }) chartElement: ElementRef<
    HTMLElement
  >;
  polygonTemplate: am4maps.MapPolygon;
  chart: am4maps.MapChart;
  series: am4maps.MapPolygonSeries;
  title: am4core.Label;
  hs: any;
  isInitialized = false;
  availableMaps = ["cases", "deaths", "recovered"];

  maps = {
    cases: {
      colors: {
        fill: "#fff2ce",
        hover: "#FF8811",
        min: "#fff2ce",
        max: "#ffbb00"
      },
      title: "Mapa de Confirmados",
      datas: [],
      label: "confirmados"
    },
    recovered: {
      colors: {
        fill: "#bbd9c5",
        hover: "#48c774",
        min: "#e2fdef",
        max: "#43D787"
      },
      title: "Mapa de Recuperados",
      datas: [],
      label: "recuperados"
    },
    deaths: {
      colors: {
        fill: "#ffdfe1",
        hover: "#E83D49",
        min: "#fff1ee",
        max: "#f9461c"
      },
      title: "Mapa de Muertes",
      datas: [],
      label: "muertes"
    },
    hospital: {
      colors: {
        fill: "#ffffff",
        hover: "#F17D07",
        min: "#fff8f0",
        max: "#F17D07"
      },
      title: "Mapa en el hospital",
      datas: [],
      label: "en el hospital"
    },
    reanimation: {
      colors: {
        fill: "#ffe8da",
        hover: "#E95D0C",
        min: "#fff1e9",
        max: "#E95D0C"
      },
      title: "Mapa en cuidados intensivos",
      datas: [],
      label: "cuidados intensivos"
    }
  };

  divisionMap = {
    world: am4geodata_worldLow,
    regionFrance: am4geodata_franceHigh,
    departmentFrance: am4geodata_franceDepartmentsHigh
  };
  selectedTypeMap = "cases";
  constructor() {}

  ngOnInit(): void {
    if (this.selectedCountry.country === "France") {
      this.selectedTypeMap = "hospital";
    }
    this.isInitialized = true;
    this.initMainMap();
    this.initDatas();
    this.updateMap();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (this.isInitialized === false) {
      return;
    }
    if (
      changes.selectedDivisionMap &&
      changes.selectedDivisionMap.previousValue !==
        changes.selectedDivisionMap.currentValue
    ) {
      this.chart.geodata = this.divisionMap[this.selectedDivisionMap];
      this.initDatas();
    }
    this.updateMap();
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeMap(): void {
    this.updateMap();
  }

  private initDatas(): any {
    if (!this.detailedStats.length) {
      // One country
      this.detailedStats = [this.detailedStats];
    }
    let id = "";
    this.maps.cases.datas = [];
    this.maps.deaths.datas = [];
    this.maps.recovered.datas = [];
    this.maps.hospital.datas = [];
    this.maps.reanimation.datas = [];
    this.detailedStats.forEach(stat => {
      id =
        this.selectedCountry.country === "France"
          ? `FR-${stat.code}`
          : stat.code;
      this.maps.cases.datas = [
        {
          id,
          value: stat.cases
        },
        ...this.maps.cases.datas
      ];
      this.maps.deaths.datas = [
        {
          id,
          value: stat.deaths
        },
        ...this.maps.deaths.datas
      ];
      this.maps.recovered.datas = [
        {
          id,
          value: stat.deaths
        },
        ...this.maps.recovered.datas
      ];
      if (this.selectedCountry.country === "France") {
        this.maps.hospital.datas = [
          {
            id,
            value: stat.hospital
          },
          ...this.maps.hospital.datas
        ];
        this.maps.reanimation.datas = [
          {
            id,
            value: stat.hospital
          },
          ...this.maps.reanimation.datas
        ];
      }
    });
  }

  private updateMap(): void {
    // A chq ngOnChanges
    this.polygonTemplate.fill = am4core.color(
      this.maps[this.selectedTypeMap].colors.fill
    );
    this.series.data = this.maps[this.selectedTypeMap].datas;
    this.series.heatRules.push({
      property: "fill",
      target: this.series.mapPolygons.template,
      min: am4core.color(this.maps[this.selectedTypeMap].colors.min),
      max: am4core.color(this.maps[this.selectedTypeMap].colors.max)
    });
    this.polygonTemplate.tooltipText =
      "{name} {value} " + this.maps[this.selectedTypeMap].label;
    this.title.text = this.maps[this.selectedTypeMap].title;
    this.hs.properties.fill = this.maps[this.selectedTypeMap].colors.hover;
  }

  private initMainMap(): void {
    this.chart = am4core.create(
      this.chartElement.nativeElement,
      am4maps.MapChart
    );
    this.chart.geodata = this.divisionMap[this.selectedDivisionMap]; // En fonction monde, region, departement
    this.chart.geodataNames = am4geodata_lang_FR;
    this.chart.projection = new am4maps.projections.Miller();
    this.series = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.series.useGeodata = true;
    this.series.dataFields.zoomLevel = "zoomLevel";
    this.series.dataFields.zoomGeoPoint = "zoomGeoPoint";
    this.polygonTemplate = this.series.mapPolygons.template;
    this.title = this.chart.chartContainer.createChild(am4core.Label);
    this.hs = this.polygonTemplate.states.create("hover");

    this.title.fontSize = 20;
    this.title.fontFamily = "inherit";
    this.title.paddingTop = 8;
    this.title.paddingLeft = 8;
    this.title.align = "left";
    this.title.zIndex = 100;
    if (this.countryNotZoom()) {
      this.chart.events.on("ready", () => {
        const target = this.series.getPolygonById(this.selectedCountry.code);
        this.chart.zoomToMapObject(target);
      });
    }
    // remove antarctique
    this.series.exclude = ["AQ"];
  }

  private countryNotZoom(): boolean {
    return (
      this.selectedCountry.country !== "Monde" &&
      this.selectedCountry.country !== "France"
    );
  }
}
