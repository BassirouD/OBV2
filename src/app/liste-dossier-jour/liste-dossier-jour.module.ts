import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeDossierJourPageRoutingModule } from './liste-dossier-jour-routing.module';

import { ListeDossierJourPage } from './liste-dossier-jour.page';
import {ChartModule} from "angular-highcharts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ChartModule,
    ReactiveFormsModule,
    ListeDossierJourPageRoutingModule
  ],
  declarations: [ListeDossierJourPage]
})
export class ListeDossierJourPageModule {}
