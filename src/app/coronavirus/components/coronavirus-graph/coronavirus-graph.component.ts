import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
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
} from "ng-apexcharts";

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
}

@Component({
  selector: "app-coronavirus-graph",
  templateUrl: "./coronavirus-graph.component.html",
  styleUrls: ["./coronavirus-graph.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit {
  @Input() data;
  @ViewChild("chart") chart: ChartComponent;
  totalConfirmed: number[] = [];
  totalRecovered: number[] = [];
  dates: string[] = [];
  chartOptions: Partial<ChartOptions>;

  constructor() {}

  ngOnInit(): void {
    this.initDatas();
    this.chartOptions = {
      series: [
        {
          name: "Confirmados",
          data: this.totalConfirmed
        },
        {
          name: "Confirmado",
          data: this.totalRecovered
        }
      ],
      chart: {
        height: "auto",
        type: "line",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },

      title: {
        text: "Casos de coronavirus en todo el mundo",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
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
        borderColor: "#f1f1f1"
      }
    };
  }

  private initDatas(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        this.totalConfirmed.push(element.totalConfirmed);
        this.dates.push(element.reportDateString);
        this.totalRecovered.push(element.totalRecovered);
      }
    });
  }
}
