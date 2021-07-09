import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeDossierPageRoutingModule } from './liste-dossier-routing.module';

import { ListeDossierPage } from './liste-dossier.page';
import {ChartModule} from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    ListeDossierPageRoutingModule,
      ChartModule
  ],
  declarations: [ListeDossierPage]
})
export class ListeDossierPageModule {}
