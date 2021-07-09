import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatglobalPageRoutingModule } from './etatglobal-routing.module';

import { EtatglobalPage } from './etatglobal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatglobalPageRoutingModule
  ],
  declarations: [EtatglobalPage]
})
export class EtatglobalPageModule {}
