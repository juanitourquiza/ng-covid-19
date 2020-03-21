import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';


export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-coronavirus-graph',
  templateUrl: './coronavirus-graph.component.html',
  styleUrls: ['./coronavirus-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit {

  @Input() data;
  @Input() dataDeaths;
  @Input() dataRecovered;
  @Input() dataConfirmed;
  @ViewChild('chart') chart: ChartComponent;
  totalConfirmed: number[] = [];
  totalRecovered: number[] = [];
  totalDeaths: number[] = [];
  dates: string[] = [];
  chartOptions: Partial<ChartOptions>;
  constructor(private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initDatas();
    this.chartOptions = {
      series: [
        {
          name: 'Recensés',
          data: this.totalConfirmed
        },
        {
          name: 'Guéris',
          data: this.totalRecovered
        },
        {
          name: 'Morts',
          data: this.totalDeaths
        }
      ],
      colors: ['#f14668', '#00d1b2', '#363636'],
      chart: {
        height: '400px',
        type: 'line',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Cas de coronavirus',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter(val, opts) {
          return (
            val +
            ' : <strong>' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            '</strong>'
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: this.dates
      },
      tooltip: {
        y: [
          {
            title: {
              formatter(val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };
  }

  private initDatas(): void {
    if (this.data) {
      this.data.forEach((element, index) => {
        if (this.data.length - index < 15) {
          this.totalConfirmed.push(element.totalConfirmed);
          this.dates.push(this.datePipe.transform(element.reportDateString, 'dd/MM'));
          this.totalRecovered.push(element.totalRecovered);
        }
      });
    } else {
      this.dataDeaths.forEach((element, index) => {
        if (this.dataDeaths.length - index < 15) {
          this.dates.push(this.datePipe.transform(element.date, 'dd/MM'));
          this.totalDeaths.push(element.totalCases);
        }
      });
      this.dataConfirmed.forEach((element, index) => {
        if (this.dataDeaths.length - index < 15) {
          this.totalConfirmed.push(element.totalCases);
        }
      });
      this.dataRecovered.forEach((element, index) => {
        if (this.dataDeaths.length - index < 15) {
          this.totalRecovered.push(element.totalCases);
        }
      });
    }

  }
}
