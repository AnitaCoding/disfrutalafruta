import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaFrutasPageRoutingModule } from './lista-frutas-routing.module';

import { ListaFrutasPage } from './lista-frutas.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaFrutasPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ListaFrutasPage]
})
export class ListaFrutasPageModule {}
