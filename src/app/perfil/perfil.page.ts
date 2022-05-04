//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, OnInit } from '@angular/core';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
    //Declaramos las propiedades del componente

  backLink:string='perfil';
  nombreUsuario:string;
  edicionNombre: boolean;

    //Inyectamos las dependencias de servicios en el constructor e inicializamos propiedades

  constructor(private servicio_comunicar_datos:ComunicarDatosService,
    private servicio_storage:StorageService) {
    this.edicionNombre = false;
   }

  ngOnInit() {
  }

    //Actualizamos los valores para que una vez que el componente llegue a este punto del ciclo de vida, funcione todo correctamente

  async ionViewWillEnter(){
    this.obtenerNombreUsuario();
  }

    //Actualizamos los valores necesarios una vez que el usuario abandone la página

  ionViewWillLeave(){
    this.servicio_storage.set('backLink', this.backLink);
  }

  //Pasamos por parámetro el tipo de bebida para que lo almacene en la propiedad correspondiente del servicio,
  //y pueda ser consultado desde cualquier otro componente
  actualizaTipoBebida(tipo:string){
    this.servicio_comunicar_datos.tipoBebida = tipo;

  }

  //Controlamos las variables booleanas para mostrar un elemento u otro al editar el nombre

  editarNombre(){
    if(!this.edicionNombre) {
      this.edicionNombre = true;
    }else{
      this.almacenarNombre();
      this.edicionNombre = false;
    };

  }

  //Consultamos en la memoria del dispositivo si hay un nombre almacenado. 

  async obtenerNombreUsuario(){
    if(await this.servicio_storage.get('nombreUsuario') == null){
      this.servicio_storage.set('nombreUsuario', "Cambia tu nombre");
      this.nombreUsuario = await this.servicio_storage.get('nombreUsuario');
    }else{
      this.nombreUsuario = await this.servicio_storage.get('nombreUsuario')
    }
  }

  //Almacenamos en la memoria del dispositivo el nombre indicado por el usuario
  almacenarNombre(){
    this.servicio_storage.set('nombreUsuario', this.nombreUsuario)
  }

}
