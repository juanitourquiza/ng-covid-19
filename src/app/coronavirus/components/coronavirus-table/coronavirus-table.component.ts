import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coronavirus-table',
  templateUrl: './coronavirus-table.component.html',
  styleUrls: ['./coronavirus-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTableComponent implements OnInit {

  @Input() detailedStats;
  @Input() selectedCountry;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [];
  dataSource: any;

  ngOnInit(): void {
    console.log(this.detailedStats);
    this.initDisplayColumns();
    this.dataSource = new MatTableDataSource(this.detailedStats);
    this.dataSource.sort = this.sort;
  }

  private initDisplayColumns(): void {
    if (this.selectedCountry.Country === 'Monde') {
      this.displayedColumns = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered'];
    } else if (this.selectedCountry.Country === 'France') {
      this.displayedColumns = ['country', 'cases', 'todayCases'];
    } else {
      this.displayedColumns = ['country', 'cases', 'deaths', 'recovered'];
    }
  }

}
