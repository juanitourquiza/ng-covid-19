import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coronavirus-column',
  templateUrl: './coronavirus-column.component.html',
  styleUrls: ['./coronavirus-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusColumnComponent implements OnInit {

  @Input() data;
  chartDatas: any[] = [];
  colorScheme = {
    domain: ['#FF0000', '#00BFFF']
  };

  constructor(private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initDatas();
  }

  private initDatas(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        const data = {
          name: this.datePipe.transform(element.reportDateString, 'dd/MM'),
          series: [
            {
              name: 'Chine',
              value: element.mainlandChina
            },
            {
              name: 'Reste du monde',
              value: element.otherLocations
            }
          ]
        };
        this.chartDatas.push(data);
      }
    });
  }

}
