import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-coronavirus-graph-country",
  templateUrl: "./coronavirus-graph-country.component.html",
  styleUrls: ["./coronavirus-graph-country.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusGraphCountryComponent implements OnInit {
  @Input() data;
  dates: string[] = [];
  chartDatas: any[];
  chinaDatas: any[] = [];
  outsideChinaDatas: any[] = [];
  colorScheme = {
    domain: ["#ffbb00", "#f9461c", "#43D787"]
  };
  constructor(private readonly datePipe: DatePipe) {}

  ngOnInit(): void {
    this.initDatasWorld();
    this.chartDatas = [
      {
        name: "China",
        series: this.chinaDatas
      },
      {
        name: "Resto del mundo",
        series: this.outsideChinaDatas
      }
    ];
  }

  private initDatasWorld(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        const chinaItem = {
          name: this.datePipe.transform(element.reportDate, "dd/MM"),
          value: element.confirmed.china
        };
        const outsideChinaItem = {
          name: this.datePipe.transform(element.reportDate, "dd/MM"),
          value: element.confirmed.outsideChina
        };
        this.chinaDatas.push(chinaItem);
        this.outsideChinaDatas.push(outsideChinaItem);
      }
    });
  }
}
