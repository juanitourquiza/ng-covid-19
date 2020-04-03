import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-coronavirus-chart-gender',
  templateUrl: './coronavirus-chart-gender.component.html',
  styleUrls: ['./coronavirus-chart-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusChartGenderComponent implements OnInit, OnDestroy {

  @Input() dataGender;
  dataType = 'hospital';
  menValue: number;
  womenValue: number;
  labelText: string;
  chart: am4charts.PieChart;
  constructor() {
  }

  ngOnInit(): void {
    this.initChart();
    this.onSelectTypeChange();
  }

  initChart(): void {
    this.chart = am4core.create('chartdiv', am4charts.PieChart);
    this.chart.responsive.enabled = true;
    const pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'gender';
    const as = pieSeries.slices.template.states.getKey('active');
    as.properties.shiftRadius = 0;
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.alignLabels = false;
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color('white');
    pieSeries.labels.template.fontSize = 13;
    pieSeries.ticks.template.disabled = true;
  }


  onSelectTypeChange(): void {
    this.labelText = 'Répartition des cas guéris selon le genre';
    this.menValue = this.dataGender.men.recovered;
    this.womenValue = this.dataGender.women.recovered;
    if (this.dataType === 'hospital') {
      this.menValue = this.dataGender.men.hospital;
      this.womenValue = this.dataGender.women.hospital;
      this.labelText = 'Répartition des cas en hospitalisation selon le genre';
    } else if (this.dataType === 'reanimation') {
      this.menValue = this.dataGender.men.reanimation;
      this.womenValue = this.dataGender.women.reanimation;
      this.labelText = 'Répartition des cas en réanimation selon le genre';
    } else if (this.dataType === 'deaths') {
      this.menValue = this.dataGender.men.deaths;
      this.womenValue = this.dataGender.women.reanimation;
      this.labelText = 'Répartition des décès selon le genre';
    }
    this.chart.data = [
      {
        gender: `Femme `,
        value: this.womenValue,
        color: am4core.color('#f9461c')
      },
      {
        gender: `Homme `,
        value: this.menValue,
        color: am4core.color('#0069cc')
      },

    ];
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

}
