import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatglobalmodalPage } from './etatglobalmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EtatglobalmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatglobalmodalPageRoutingModule {}
