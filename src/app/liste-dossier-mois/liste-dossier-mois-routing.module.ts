import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeDossierMoisPage } from './liste-dossier-mois.page';

const routes: Routes = [
  {
    path: '',
    component: ListeDossierMoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeDossierMoisPageRoutingModule {}
