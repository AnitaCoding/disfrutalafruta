import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuBottomPage } from './menu-bottom.page';

const routes: Routes = [
  {
    path: '',
    component: MenuBottomPage,
    children:[
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then( m => m.FavoritosPageModule)
      },
      {
        path: 'insignias',
        loadChildren: () => import('../insignias/insignias.module').then( m => m.InsigniasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'receta',
        loadChildren: () => import('../receta/receta.module').then( m => m.RecetaPageModule)
      },
      {
        path: 'recetas-realizadas',
        loadChildren: () => import('../recetas-realizadas/recetas-realizadas.module').then( m => m.RecetasRealizadasPageModule)
      }
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuBottomPageRoutingModule {}
