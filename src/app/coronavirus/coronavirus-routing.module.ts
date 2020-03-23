import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoronavirusComponent } from './containers/coronavirus/coronavirus.component';

export const coronavirusRoutes: Routes = [
  {
    component: CoronavirusComponent,
    path: '',
  },
  {
    component: CoronavirusComponent,
    path: ':country',
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
