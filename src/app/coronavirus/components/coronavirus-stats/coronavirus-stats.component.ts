import { Component, Input, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent implements OnChanges {

  @Input() mainStats;
  @Input() data;
  @Input() selectedCountry;

  // stats: any[] = this.mainStats.value;

  ngOnChanges(): void {
    console.log(this.selectedCountry);
    console.log(this.mainStats);
  }





}
