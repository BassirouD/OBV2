import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeDossierJourPage } from './liste-dossier-jour.page';

const routes: Routes = [
  {
    path: '',
    component: ListeDossierJourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeDossierJourPageRoutingModule {}
