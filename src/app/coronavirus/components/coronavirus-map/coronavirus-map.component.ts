import { Component, OnInit, OnDestroy, NgZone, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { COUNTRIES } from '@coronavirus/constants/countries.constants';
import { CountryPipe } from '@shared/pipes/country.pipe';
import am4geodata_lang_FR from '@amcharts/amcharts4-geodata/lang/FR';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-coronavirus-map',
  templateUrl: './coronavirus-map.component.html',
  styleUrls: ['./coronavirus-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusMapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() detailedStats;
  @Input() selectedTypeMap;
  chart: am4maps.MapChart;
  chartDatasCases: any[] = [];
  chartDatasDeaths: any[] = [];
  chartDatasRecovered: any[] = [];
  myCountries: any[] = COUNTRIES;

  constructor(
    private readonly zone: NgZone,
    private readonly countryPipe: CountryPipe
  ) {
  }

  ngOnInit(): void {
    for (let j = 0; j < this.detailedStats.length; j++) {
      for (let i = 0; i < this.myCountries.length; i++) {
        if (this.countryPipe.transform(this.myCountries[i].country) === this.detailedStats[j].country) {
          this.chartDatasCases.push({
            id: this.myCountries[i].code,
            value: this.detailedStats[j].cases
          });
          this.chartDatasDeaths.push({
            id: this.myCountries[i].code,
            value: this.detailedStats[j].deaths
          });
          this.chartDatasRecovered.push({
            id: this.myCountries[i].code,
            value: this.detailedStats[j].recovered
          });
        }
      }
    }

  }

  ngOnChanges(): void {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4maps.MapChart);
      chart.geodata = am4geodata_worldLow;
      chart.geodataNames = am4geodata_lang_FR;
      chart.projection = new am4maps.projections.Miller();

      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      const polygonTemplate = polygonSeries.mapPolygons.template;
      const hs = polygonTemplate.states.create('hover');
      polygonTemplate.tooltipText = '{name} {value}';
      if (this.selectedTypeMap === 'cases') {
        this.initMapCases(polygonTemplate, polygonSeries, hs);
      } else if (this.selectedTypeMap === 'deaths') {
        this.initMapDeaths(polygonTemplate, polygonSeries, hs);
      } else {
        this.initMapRecovered(polygonTemplate, polygonSeries, hs);
      }
      // remove antarctique
      polygonSeries.exclude = ['AQ'];
      this.chart = chart;
    });
  }

  initMapCases(polygonTemplate: any, polygonSeries: any, hs: any): void {
    polygonTemplate.fill = am4core.color('#f7ddae');
    // Create hover state and set alternative fill color
    hs.properties.fill = am4core.color('#FF8811');
    polygonSeries.data = this.chartDatasCases;
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#f7ddae'),
      max: am4core.color('#FF8811')
    });
  }


  initMapDeaths(polygonTemplate: any, polygonSeries: any, hs: any): void {
    polygonTemplate.fill = am4core.color('#ffdfe1');
    // Create hover state and set alternative fill color
    hs.properties.fill = am4core.color('#E83D49');
    polygonSeries.data = this.chartDatasDeaths;
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#e8c0c3'),
      max: am4core.color('#E83D49')
    });
  }


  initMapRecovered(polygonTemplate: any, polygonSeries: any, hs: any): void {
    polygonTemplate.fill = am4core.color('#bbd9c5');
    // Create hover state and set alternative fill color
    hs.properties.fill = am4core.color('#48c774');
    polygonSeries.data = this.chartDatasRecovered;
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#bbd9c5'),
      max: am4core.color('#48c774')
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
