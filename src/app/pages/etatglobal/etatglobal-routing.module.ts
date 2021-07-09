import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatglobalPage } from './etatglobal.page';

const routes: Routes = [
  {
    path: '',
    component: EtatglobalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatglobalPageRoutingModule {}
