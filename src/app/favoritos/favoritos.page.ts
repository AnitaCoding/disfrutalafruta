//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, OnInit } from '@angular/core';
import { Receta } from '../models/receta';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { StorageService } from '../services/storage.service';

//Se genera el decorador
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})

export class FavoritosPage implements OnInit {

  //Declaramos las propiedades del componente
  lista_favoritos: Array<Receta>;
  backLink:string;

  //Inyectamos las dependencias de servicios en el constructor e inicializamos propiedades
  constructor(private servicio_storage:StorageService,
    private servicio_comunicar_datos:ComunicarDatosService) {

    this.lista_favoritos = new Array<Receta>();
    this.backLink = 'favoritos'

   }

  ngOnInit() {}

  //Esta función se produce cuando se accede al apartado del componente. Se elige aquí y no en el constructor,
  //porque este se ejecuta una sola vez, y querremos saber si existe la lista cada vez que se acceda.
  
  ionViewWillEnter(){
    //Se comprueba si existe una lista de favoritos
    this.existeLista();
  }

  //IonViewDidLeave e ionViewWillLeave, se ejecutan cuando se sale del apartado favoritos. Corresponden al ciclo de vida del componente, 
  //junto con las anteriores
  ionViewDidLeave(){
    //Se elimina el contenido del array para que no se duplique si se vuelve a entrar en el apartado
    this.lista_favoritos=[];
  }

  ionViewWillLeave(){
    //Se modifica el valor del enlace para volver atrás y se almacena en la memoria del dispositivo.
    this.servicio_storage.set('backLink', this.backLink);
  }

  //Se comprueba si existe una lista de favoritos almacenada en la memoria del dispositivo,
  //y se almacena en la propiedad que corresponde.
  async existeLista(){
    if(await this.servicio_storage.get('listaFavoritos')!=null)
    {
      this.lista_favoritos = JSON.parse(await this.servicio_storage.get('listaFavoritos'))
    
    }
  }
  
  //Al hacer click en el botón de una de las recetas, se obtiene su nombre, y se le pasa como parámetro a esta función.
  //Ella se encargará de buscarla en el array en el que están almacenadas todas las favoritas y almacena los datos en el servicio,
  //para ponerlos a disposición en el componente que corresponda.
  comunicarDatos(r:string){
    this.lista_favoritos.forEach(item=>{
      if(r == item.nombre){
        this.servicio_comunicar_datos.currentRecipe = item;
      }
    })
  }

}
