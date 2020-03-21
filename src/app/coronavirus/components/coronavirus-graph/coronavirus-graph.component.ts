import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  totalConfirmed: any[] = [];
  totalRecovered: any[] = [];
  totalDeaths: any[] = [];
  dates: string[] = [];
  chartDatas: any[];
  colorScheme = {
    domain: ['#f14668', '#00d1b2', '#363636']
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
        name: 'Guéris',
        series: this.totalRecovered
      },
      {
        name: 'Morts',
        series: this.totalDeaths
      }
    ];

  }

  private initDatasWorld(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        const caseItem = {
          name: this.datePipe.transform(element.reportDateString, 'dd/MM'),
          value: element.totalConfirmed
        };
        const recoveredItem = {
          name: this.datePipe.transform(element.reportDateString, 'dd/MM'),
          value: element.totalRecovered
        };
        this.totalConfirmed.push(caseItem);
        this.totalRecovered.push(recoveredItem);
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
