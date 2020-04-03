import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoronavirusComponent } from "./containers/coronavirus/coronavirus.component";
import { CoronavirusLinksComponent } from "./containers/coronavirus-links/coronavirus-links.component";
import { CoronavirusLinksFranceComponent } from "./containers/coronavirus-links-france/coronavirus-links-france.component";

export const coronavirusRoutes: Routes = [
  {
    component: CoronavirusComponent,
    path: ""
  },
  {
    component: CoronavirusComponent,
    path: "stats/:country"
  },
  {
    component: CoronavirusComponent,
    path: "stats/:country/region/:region"
  },
  {
    component: CoronavirusComponent,
    path: "stats/:country/departement/:department"
  },
  {
    component: CoronavirusLinksComponent,
    path: "stats"
  },
  {
    component: CoronavirusLinksFranceComponent,
    path: "stats/liens/france"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule, RouterModule.forChild(coronavirusRoutes)]
})
export class CoronavirusRoutingModule {}
