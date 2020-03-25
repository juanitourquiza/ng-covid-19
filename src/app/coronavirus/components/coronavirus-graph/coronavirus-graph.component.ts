import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-coronavirus-graph',
  templateUrl: './coronavirus-graph.component.html',
  styleUrls: ['./coronavirus-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphComponent implements OnInit {

  @Input() data;
  @Input() dataDeaths;
  @Input() dataRecovered;
  @Input() dataConfirmed;
  totalConfirmed: any[] = [];
  totalRecovered: any[] = [];
  totalDeaths: any[] = [];
  dates: string[] = [];
  chartDatas: any[];
  colorScheme = {
    domain: ['#ffbb00', '#f9461c', '#43D787']
  };
  constructor(private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initDatas();
    this.chartDatas = [
      {
        name: 'Recensés',
        series: this.totalConfirmed
      },
      {
        name: 'Morts',
        series: this.totalDeaths
      },
      {
        name: 'Guéris',
        series: this.totalRecovered
      }
    ];

  }

  private initDatasWorld(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        if (element.confirmed && element.confirmed.total) {
          const caseItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
            value: element.confirmed.total
          };
          this.totalConfirmed.push(caseItem);
        }

        if (element.recovered && element.recovered.total) {
          const recoveredItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
            value: element.recovered.total
          };
          this.totalRecovered.push(recoveredItem);
        }
        if (element.deaths && element.deaths.total) {
          const deathItem = {
            name: this.datePipe.transform(element.reportDate, 'dd/MM'),
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
          name: this.datePipe.transform(element.date, 'dd/MM'),
          value: element.totalCases
        };
        this.totalDeaths.push(deathItem);
      }
    });
    this.dataConfirmed.forEach((element, index) => {
      if (this.dataConfirmed.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, 'dd/MM'),
          value: element.totalCases
        };
        this.totalConfirmed.push(caseItem);
      }
    });
    this.dataRecovered.forEach((element, index) => {
      if (this.dataRecovered.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.date, 'dd/MM'),
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
}
