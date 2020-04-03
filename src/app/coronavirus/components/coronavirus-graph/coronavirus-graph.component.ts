import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { DatePipe } from "@angular/common";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4lang_fr_FR from "@amcharts/amcharts4/lang/fr_FR";
@Component({
  selector: "app-coronavirus-graph",
  templateUrl: "./coronavirus-graph.component.html",
  styleUrls: ["./coronavirus-graph.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit, OnDestroy {
  @Input() data;
  @Input() dataFrance;
  @Input() dataDeaths;
  @Input() dataRecovered;
  @Input() dataConfirmed;
  @Input() selectedZone;
  chart: am4charts.XYChart;
  totalConfirmed: any[] = [];
  totalRecovered: any[] = [];
  totalDeaths: any[] = [];
  dates: string[] = [];
  chartDatas: any[];
  colorScheme = {
    domain: ["#ffbb00", "#f9461c", "#43D787"]
  };
  referenceLines: any[] = [];
  dataType: string = "total";
  @ViewChild("chartElement", { static: true }) chartElement: ElementRef<
    HTMLElement
  >;
  constructor(private readonly datePipe: DatePipe) {}

  ngOnInit(): void {
    if (this.dataFrance) {
      this.initChart();
      return;
    }
    this.initDatas();
    this.chartDatas = [
      {
        name: "Identificados",
        series: this.totalConfirmed
      },
      {
        name: "Muertos",
        series: this.totalDeaths
      },
      {
        name: "Recuperados",
        series: this.totalRecovered
      }
    ];
  }

  ngOnDestroy(): void {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
  }

  onSelectTypeChange(): void {
    this.chart.data = this.dataFrance[this.dataType];
    if (this.selectedZone) {
      this.chart.data = this.dataFrance[this.dataType].filter(
        item => item.code === this.selectedZone.code
      );
    }
  }

  private initDatasWorld(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        if (element.confirmed && element.confirmed.total) {
          const caseItem = {
            name: this.datePipe.transform(element.reportDate, "dd/MM"),
            value: element.confirmed.total
          };
          this.totalConfirmed.push(caseItem);
        }

        if (element.recovered && element.recovered.total) {
          const recoveredItem = {
            name: this.datePipe.transform(element.reportDate, "dd/MM"),
            value: element.recovered.total
          };
          this.totalRecovered.push(recoveredItem);
        }
        if (element.deaths && element.deaths.total) {
          const deathItem = {
            name: this.datePipe.transform(element.reportDate, "dd/MM"),
            value: element.deaths.total
          };

          this.totalDeaths.push(deathItem);
        }
      }
    });
  }

  private initDatasCountry(): void {
    this.dataDeaths.forEach((element, index) => {
      if (this.dataDeaths.length - index < 15) {
        const deathItem = {
          name: this.datePipe.transform(element.date, "dd/MM"),
          value: element.totalCases
        };
        this.totalDeaths.push(deathItem);
      }
    });
    this.dataConfirmed.forEach((element, index) => {
      if (this.dataConfirmed.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, "dd/MM"),
          value: element.totalCases
        };
        this.totalConfirmed.push(caseItem);
      }
    });
    this.dataRecovered.forEach((element, index) => {
      if (this.dataRecovered.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, "dd/MM"),
          value: element.totalCases
        };
        this.totalRecovered.push(caseItem);
      }
    });
  }

  private initDatas(): void {
    if (this.data) {
      this.initDatasWorld();
    } else {
      this.initDatasCountry();
    }
  }

  private initChart(): void {
    // Create chart instance
    this.chart = am4core.create(
      this.chartElement.nativeElement,
      am4charts.XYChart
    );
    this.chart.language.locale = am4lang_fr_FR;
    this.chart.dateFormatter.dateFormat = "dd MMMM";
    // Add data
    this.onSelectTypeChange();

    // Date axis
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.fontSize = 13;
    // Value axis
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.fontSize = 13;

    this.createSeries(
      "date",
      "hospital",
      "hospitalisations en cours",
      "#F17D07"
    );
    this.createSeries("date", "reanimation", "en réanimaton", "#E95D0C");
    this.createSeries("date", "deaths", "décès", "#f9461c");
    this.createSeries("date", "recovered", "guéris", "#43D787");

    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();
    // Add legend
    this.chart.legend = new am4charts.Legend();
  }

  private createSeries(
    valueX: string,
    valueY: string,
    name: string,
    color: string
  ): void {
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = valueX;
    series.name = name;
    series.strokeWidth = 2;
    series.stroke = am4core.color(color); // red
    series.fill = am4core.color(color);
    series.fontSize = 13;

    /* Tooltip */
    series.tooltipText = "{dateX}\n[bold]{valueY}[/] {name}";
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color(color);
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.label.fontSize = 13;

    /* Bullet */
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.stroke = am4core.color(color);
    /* Hover */
    const bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;
  }
}
