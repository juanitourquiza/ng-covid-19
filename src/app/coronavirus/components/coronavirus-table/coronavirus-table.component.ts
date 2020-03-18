import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, AfterViewInit, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coronavirus-table',
  templateUrl: './coronavirus-table.component.html',
  styleUrls: ['./coronavirus-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTableComponent implements OnChanges {

  @Input() detailedStats;
  @Input() selectedCountry;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [];
  dataSource: any;

  ngOnChanges(): void {
    this.initDisplayColumns();
    if (this.detailedStats.value) {
      this.dataSource = new MatTableDataSource(this.detailedStats.value);
      this.dataSource.sort = this.sort;
    }
  }

  private initDisplayColumns(): void {
    if (this.selectedCountry === 'Monde') {
      this.displayedColumns = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered'];
    } else if (this.selectedCountry === 'France') {
      this.displayedColumns = ['country', 'cases', 'todayCases'];
    } else {
      this.displayedColumns = ['country', 'cases', 'deaths', 'recovered'];
    }
  }

}
