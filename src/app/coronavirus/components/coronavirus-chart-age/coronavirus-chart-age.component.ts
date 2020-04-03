import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-coronavirus-chart-age',
  templateUrl: './coronavirus-chart-age.component.html',
  styleUrls: ['./coronavirus-chart-age.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusChartAgeComponent implements OnInit, OnDestroy {

  @Input() dataAge;
  dataType = 'passage';
  data: any[] = [];
  labelText: string;
  chart: am4charts.XYChart;
  series: am4charts.ColumnSeries;
  constructor() { }

  ngOnInit(): void {
    this.initChart();
    this.onSelectTypeChange();
  }

  onSelectTypeChange(): void {
    this.labelText = 'Répartition des cas passés aux urgences selon l\'âge';
    this.series.columns.template.fill = am4core.color('#FABC3C');
    if (this.dataType === 'hospital') {
      this.labelText = 'Répartition des cas en hospitalisation selon l\'âge';
      this.series.columns.template.fill = am4core.color('#F17D07');
    } else if (this.dataType === 'medical') {
      this.labelText = 'Répartition des cas qui ont subit des actes médicaux selon l\'âge';
      this.series.columns.template.fill = am4core.color('#FFB238');
    }
    this.data = [
      {
        category: '< 15',
        value: this.dataAge.A[this.dataType],
      },
      {
        category: '15-44',
        value: this.dataAge.B[this.dataType],
      },
      {
        category: '45-64',
        value: this.dataAge.C[this.dataType],
      },
      {
        category: '65-74',
        value: this.dataAge.D[this.dataType],
      },
      {
        category: '75 >',
        value: this.dataAge.E[this.dataType],
      },
    ];
    this.chart.data = this.data;
  }

  private initChart(): void {
    this.chart = am4core.create('chart-age', am4charts.XYChart);
    this.chart.responsive.enabled = true;

    /* Cateory */
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.fontSize = 13;
    categoryAxis.renderer.labels.template.dy = 10;

    /* Value */
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 13;

    /* Create series */
    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.dataFields.valueY = 'value';
    this.series.dataFields.categoryX = 'category';
    this.series.calculatePercent = true;
    this.series.fontSize = 13;

    /* Number scale */
    this.series.numberFormatter = new am4core.NumberFormatter();
    this.series.numberFormatter.numberFormat = '#.0';

    /* Tooltip text */
    this.series.columns.template.tooltipText = '[bold]{name}[/]\n{categoryX} : [bold]{valueY.percent}%[/] ({valueY} personnes)';

    /* Opacity */
    this.series.columns.template.strokeOpacity = 0;

    /* Bar width */
    this.series.columns.template.width = am4core.percent(95);

    /* Bar color */
    this.series.columns.template.fill = am4core.color('#FF4545');

    /* Tooltip color */
    this.series.tooltip.autoTextColor = false;
    this.series.tooltip.label.fill = am4core.color('#FFFFFF');

    /* Label on column */
    const labelBullet = this.series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY.percent}%';
    labelBullet.fontSize = 12;
    labelBullet.locationY = 0.5;
    labelBullet.label.fill = am4core.color('#fff');
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

}
