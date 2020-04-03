import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusGraphComponent } from './components/coronavirus-graph/coronavirus-graph.component';
import { CoronavirusStatsComponent } from './components/coronavirus-stats/coronavirus-stats.component';
import { CoronavirusColumnComponent } from './components/coronavirus-column/coronavirus-column.component';
import { CoronavirusTableComponent } from './components/coronavirus-table/coronavirus-table.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CoronavirusLinksComponent } from './containers/coronavirus-links/coronavirus-links.component';
import { CoronavirusMapComponent } from './components/coronavirus-map/coronavirus-map.component';
import { CoronavirusGraphCountryComponent } from './components/coronavirus-graph-country/coronavirus-graph-country.component';
import { CoronavirusChartGenderComponent } from './components/coronavirus-chart-gender/coronavirus-chart-gender.component';
import { CoronavirusChartAgeComponent } from './components/coronavirus-chart-age/coronavirus-chart-age.component';
import { CoronavirusSelectComponent } from './components/coronavirus-select/coronavirus-select.component';
import { CoronavirusLinksFranceComponent } from './containers/coronavirus-links-france/coronavirus-links-france.component';
@NgModule({
  declarations: [
    CoronavirusComponent,
    CoronavirusGraphComponent,
    CoronavirusStatsComponent,
    CoronavirusColumnComponent,
    CoronavirusTableComponent,
    CoronavirusLinksComponent,
    CoronavirusMapComponent,
    CoronavirusGraphCountryComponent,
    CoronavirusChartGenderComponent,
    CoronavirusChartAgeComponent,
    CoronavirusSelectComponent,
    CoronavirusLinksFranceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoronavirusRoutingModule,
    NgxChartsModule
  ]
})
export class CoronavirusModule { }
