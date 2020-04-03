import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent implements OnInit {

  @Input() mainStats;
  @Input() franceStats;
  @Input() selectedCountry;
  @Input() selectedRegion;
  @Input() selectedDepartment;
  @Input() lastUpdate;

  constructor() {
  }

  ngOnInit(): void {
    if (this.franceStats) {
      const lastElement = this.franceStats.length - 1;
      const beforeLastElement = this.franceStats.length - 2;
      this.franceStats = {
        hospital: this.franceStats[lastElement].hospital,
        todayHospital: this.franceStats[lastElement].hospital - this.franceStats[beforeLastElement].hospital,
        reanimation: this.franceStats[lastElement].reanimation,
        todayReanimation: this.franceStats[lastElement].reanimation - this.franceStats[beforeLastElement].reanimation,
        recovered: this.franceStats[lastElement].recovered,
        todayRecovered: this.franceStats[lastElement].recovered - this.franceStats[beforeLastElement].recovered,
        deaths: this.franceStats[lastElement].deaths,
        todayDeaths: this.franceStats[lastElement].deaths - this.franceStats[beforeLastElement].deaths
      };
    }

  }
}
