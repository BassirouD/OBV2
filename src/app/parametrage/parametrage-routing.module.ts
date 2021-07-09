import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametragePage } from './parametrage.page';

const routes: Routes = [
  {
    path: '',
    component: ParametragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametragePageRoutingModule {}
