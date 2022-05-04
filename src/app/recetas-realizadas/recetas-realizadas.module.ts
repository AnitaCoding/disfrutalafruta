import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasRealizadasPageRoutingModule } from './recetas-realizadas-routing.module';

import { RecetasRealizadasPage } from './recetas-realizadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasRealizadasPageRoutingModule
  ],
  declarations: [RecetasRealizadasPage]
})
export class RecetasRealizadasPageModule {}
