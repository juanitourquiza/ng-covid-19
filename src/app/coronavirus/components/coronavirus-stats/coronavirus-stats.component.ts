import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent implements OnInit {

  @Input() mainStats;
  @Input() data;
  @Input() selectedCountry;

  ngOnInit() {
    console.log(this.mainStats);
  }

}
