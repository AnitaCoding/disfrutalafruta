//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component } from '@angular/core';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Declaramos las propiedades del componente.
  backLink: string;
  frutas: Array<Array<string>>;
  frutaSeleccionada: string;

  //Inyectamos las dependencias de los servicios en el constructor como parámetros de este, e inicializamos los valores de las propiedades
  //del componente.
  constructor(private servicio_comunicar_datos:ComunicarDatosService,
    private servicio_storage:StorageService) {
    this.frutas = [['Piña', 'pina'],['Manzana', 'manzana'], ['Fresa', 'fresa'], ['Mango', 'mango'], ['Papaya', 'papaya'], ['Cereza', 'cereza'], ['Melón', 'melon'], ['Sandía', 'sandia'], ['Melocotón', 'melocoton'], ['Limón', 'limon'],
    ['Plátano', 'platano']];
    this.backLink = 'home'

  }

  //Al abandonar la página, se setea el valor de backLink en el almacenamiento interno del dispositivo.

  ionViewWillLeave(){
    this.servicio_storage.set('backLink', this.backLink);
  }

  //Al hacer click en alguno de los botones, se almacena el nombre de la fruta en el servicio para disponer de él en otros componentes

  actualizaNombreFruta(f:Array<string>){
    this.servicio_comunicar_datos.nombreFruta = f[1];
  }

}
