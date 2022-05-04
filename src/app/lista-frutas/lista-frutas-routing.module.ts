import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaFrutasPage } from './lista-frutas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaFrutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaFrutasPageRoutingModule {}
