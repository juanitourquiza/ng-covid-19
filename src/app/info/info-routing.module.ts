import { DiseaseComponent } from "./disease/disease.component";
import { GouvComponent } from "./gouv/gouv.component";
import { AdviseComponent } from "./advise/advise.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiseaseTestComponent } from "./disease-test/disease-test.component";

export const infoRoutes: Routes = [
  {
    component: AdviseComponent,
    path: "consejos"
  },
  {
    component: GouvComponent,
    path: "gobierno"
  },
  {
    component: DiseaseTestComponent,
    path: "enfermedad-test-coronavirus"
  },
  {
    component: DiseaseComponent,
    path: "enfermedad-coronavirus"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule, RouterModule.forChild(infoRoutes)]
})
export class InfoRoutingModule {}
