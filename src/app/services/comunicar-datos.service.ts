import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class ComunicarDatosService {

  //Creamos las propiedades a las que se va a llamar desde los componentes para almacenar datos, y ahcer
  //posible la comunicación entre componentes.

  nombreFruta:string='';
  tipoBebida: string = '';
  currentRecipe:Receta = new Receta();

  constructor() { }
}
