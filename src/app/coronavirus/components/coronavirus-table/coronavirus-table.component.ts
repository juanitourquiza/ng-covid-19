import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coronavirus-table',
  templateUrl: './coronavirus-table.component.html',
  styleUrls: ['./coronavirus-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusTableComponent implements OnInit, OnChanges {

  @Input() detailedStats;
  @Input() selectedCountry;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [];
  dataSource: any;

  constructor() {

  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.detailedStats);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        return (currentTerm + (data as { [key: string]: any })[key] + '◬');
      }, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      const transformedFilter = filter.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initDataTable(): void {
    if (this.selectedCountry.country === 'Monde') {
      this.displayedColumns = ['translation', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered'];
    } else if (this.selectedCountry.country === 'France') {
      this.displayedColumns = ['translation', 'hospital', 'reanimation', 'deaths', 'recovered'];
    } else {
      this.displayedColumns = ['translation', 'cases', 'deaths', 'recovered'];
    }
  }

}
