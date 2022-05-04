//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, OnInit } from '@angular/core';
import { Receta } from '../models/receta';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-recetas-realizadas',
  templateUrl: './recetas-realizadas.page.html',
  styleUrls: ['./recetas-realizadas.page.scss'],
})
export class RecetasRealizadasPage implements OnInit {

      //Declaramos las propiedades del componente

  tipoBebida: string;
  listaRealizadas: Array<Receta>;
  lista_aux: Array<Receta>;
  backLink:string='recetas-realizadas';

      //Inyectamos las dependencias de servicios en el constructor e inicializamos propiedades

  constructor(private servicio_comunicar_datos:ComunicarDatosService,
    private servicio_storage:StorageService) {
      
    this.listaRealizadas = new Array<Receta>();
    this.lista_aux = new Array<Receta>();
   }

  ngOnInit() {
  }


      //Actualizamos los valores para que una vez que el componente llegue a este punto del ciclo de vida, funcione todo correctamente
  async ionViewWillEnter(){
    this.backLink = await this.servicio_storage.get('backLink')
    this.tipoBebida = this.servicio_comunicar_datos.tipoBebida;
    this.filtrarRealizadasPorBebida();

  }

      //Actualizamos los valores necesarios una vez que el usuario abandone la página

  ionViewWillLeave(){
    this.servicio_storage.set('backLink', this.backLink);
    this.listaRealizadas = [];
    this.lista_aux = [];
  }

  //La página muestra unos botones cuyo título es el nombre de un tipo de bebida.
  //Se consulta la lista almacenada en la memoria interna del dispositivo, y se filtran aquellas recetas
  //cuyo tipo de bebida coincida con el seleccionado.
  async filtrarRealizadasPorBebida(){
    if(await this.servicio_storage.get('listaRealizadas') != null){
      this.listaRealizadas = JSON.parse(await this.servicio_storage.get('listaRealizadas'));
      this.listaRealizadas.forEach(item => {
        if(item.tipoBebida == this.tipoBebida){
          this.lista_aux.push(item);

        }
      })
      
    }
  }

 //Al hacer click en el botón de una de las recetas, se obtiene su nombre, y se le pasa como parámetro a esta función.
  //Ella se encargará de buscarla en el array en el que están almacenadas todas las favoritas y almacena los datos en el servicio,
  //para ponerlos a disposición en el componente que corresponda.

  comunicarDatos(r:string){
    this.listaRealizadas.forEach(item=>{
      if(r == item.nombre){
        this.servicio_comunicar_datos.currentRecipe = item;
      }
    })
  }

}
