import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeDossierMoisPageRoutingModule } from './liste-dossier-mois-routing.module';

import { ListeDossierMoisPage } from './liste-dossier-mois.page';
import {ChartModule} from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    ListeDossierMoisPageRoutingModule,
      ChartModule
  ],
  declarations: [ListeDossierMoisPage]
})
export class ListeDossierMoisPageModule {}
