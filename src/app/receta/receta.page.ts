//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, OnInit } from '@angular/core';
import { Receta } from '../models/receta';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {

  //Declaramos las propiedades del componente

  recetaSeleccionada: Receta;
  backLink:string;

  //Inyectamos las dependencias de servicios en el constructor e inicializamos propiedades

  constructor(private servicio_comunicar_datos:ComunicarDatosService,
    private servicio_storage: StorageService) {
    this.recetaSeleccionada = new Receta();
   }

  ngOnInit() {
  }

  //Actualizamos los valores para que una vez que el componente llegue a este punto del ciclo de vida, funcione todo correctamente

  async ionViewWillEnter(){
    this.comprobarRecetas();
    this.recetaSeleccionada = this.servicio_comunicar_datos.currentRecipe;
    this.backLink = await this.servicio_storage.get('backLink')

  }

  //Creamos un array en el que, de existir, se almacena la lista de favoritos existente en la memoria del dispositivo.
  //Se añade la receta seleccionada, y se pone ahora entera en la memoria
  async almacenarFavoritos(){
    let lista_favoritos = new Array();
    this.recetaSeleccionada.isFavorita = true;
    if((await this.servicio_storage.get('listaFavoritos'))==null){
      lista_favoritos.push(this.recetaSeleccionada);
      this.servicio_storage.set('listaFavoritos', JSON.stringify(lista_favoritos))      
    }else{
      lista_favoritos = JSON.parse(await this.servicio_storage.get('listaFavoritos'));
      lista_favoritos.push(this.recetaSeleccionada);
      this.servicio_storage.set('listaFavoritos', JSON.stringify(lista_favoritos))
    }
  }

  //Se comprueban las lista de favoritas y realizadas de la memoria interna para controlar las funciones de los botones de
  //guardar como favorito y guardar como realizada.

  async comprobarRecetas(){
    let lista_recetas = new Array();
    if(await this.servicio_storage.get('listaFavoritos')!==null){
      lista_recetas = JSON.parse(await this.servicio_storage.get('listaFavoritos'))
      lista_recetas.forEach(item=>{
        if(item.nombre == this.recetaSeleccionada.nombre){
          this.recetaSeleccionada.isFavorita = true;
        }
      })
    }else if(await this.servicio_storage.get('listaRealizadas')!==null){
      lista_recetas = JSON.parse(await this.servicio_storage.get('listaRealizadas'))
      lista_recetas.forEach(item =>{
        if(item.nombre == this.recetaSeleccionada.nombre){
          this.recetaSeleccionada.isFavorita = true;
          this.recetaSeleccionada.realizada =true;
        }
      })
    }
  }

  //Se almacenan las recetas realizadas del mismo modo que hemos hecho con las favoritas  
  async almacenarRealizadas(){
    let lista_realizadas = new Array();
    if((await this.servicio_storage.get('listaRealizadas'))==null){
      this.recetaSeleccionada.realizada = true;
      lista_realizadas.push(this.recetaSeleccionada);
      this.servicio_storage.set('listaRealizadas', JSON.stringify(lista_realizadas))
      
    }else{
      lista_realizadas = JSON.parse(await this.servicio_storage.get('listaRealizadas'));
      this.recetaSeleccionada.realizada = true;
      lista_realizadas.push(this.recetaSeleccionada);
      this.servicio_storage.set('listaRealizadas', JSON.stringify(lista_realizadas))
    
    }

    this.eliminarFavorito(this.recetaSeleccionada.nombre);

  }

  //Una vez que el usuario ha seleccionado una receta como realizada, si existe, se elimina de la lista de favoritos
  async eliminarFavorito(nombre:string){
    let i:number = 0;
    let lista_favoritos = JSON.parse(await this.servicio_storage.get('listaFavoritos'))
    if(lista_favoritos.length <=1){
      this.servicio_storage.remove('listaFavoritos')
    }else{
      lista_favoritos.forEach(item=>{
        if(item.nombre == nombre){
  
          lista_favoritos.splice(i,1);
          this.servicio_storage.set('listaFavoritos', JSON.stringify(lista_favoritos))
  
        }
      i++;
      })
    }
  }

}
