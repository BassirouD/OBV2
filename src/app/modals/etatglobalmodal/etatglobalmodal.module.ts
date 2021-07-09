import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatglobalmodalPageRoutingModule } from './etatglobalmodal-routing.module';

import { EtatglobalmodalPage } from './etatglobalmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatglobalmodalPageRoutingModule
  ],
  declarations: [EtatglobalmodalPage]
})
export class EtatglobalmodalPageModule {}
