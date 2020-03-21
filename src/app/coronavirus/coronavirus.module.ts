
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusGraphComponent } from './components/coronavirus-graph/coronavirus-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CoronavirusStatsComponent } from './components/coronavirus-stats/coronavirus-stats.component';
import { CoronavirusColumnComponent } from './components/coronavirus-column/coronavirus-column.component';
import { CoronavirusTableComponent } from './components/coronavirus-table/coronavirus-table.component';

@NgModule({
  declarations: [
    CoronavirusComponent,
    CoronavirusGraphComponent,
    CoronavirusStatsComponent,
    CoronavirusColumnComponent,
    CoronavirusTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoronavirusRoutingModule,
    NgApexchartsModule
  ]
})
export class CoronavirusModule { }
