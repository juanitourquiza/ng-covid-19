import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadChildren: () => import('./coronavirus/coronavirus.module')
      .then(m => m.CoronavirusModule),
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })]
})
export class AppRoutingModule { }
