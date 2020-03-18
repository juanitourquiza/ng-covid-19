import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent {

  @Input() mainStats;
  @Input() data;
  @Input() selectedCountry;

}
