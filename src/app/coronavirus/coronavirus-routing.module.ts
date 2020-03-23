import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';
import { CoronavirusLinksComponent } from './containers/coronavirus-links/coronavirus-links.component';

export const coronavirusRoutes: Routes = [
  {
    component: CoronavirusComponent,
    path: '',
  },
  {
    component: CoronavirusComponent,
    path: 'stats/:country',
  },
  {
    component: CoronavirusLinksComponent,
    path: 'stats',
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(coronavirusRoutes)
  ]
})
export class CoronavirusRoutingModule {
}
