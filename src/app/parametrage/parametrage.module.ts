import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametragePageRoutingModule } from './parametrage-routing.module';

import { ParametragePage } from './parametrage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametragePageRoutingModule
  ],
  declarations: [ParametragePage]
})
export class ParametragePageModule {}
