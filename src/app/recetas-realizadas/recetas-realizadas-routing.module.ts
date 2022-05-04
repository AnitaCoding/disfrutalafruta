import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasRealizadasPage } from './recetas-realizadas.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasRealizadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasRealizadasPageRoutingModule {}
