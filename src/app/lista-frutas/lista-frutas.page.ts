//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, OnInit } from '@angular/core';
import { Fruta } from '../models/fruta';
import { Receta } from '../models/receta';
import { ComunicarDatosService } from '../services/comunicar-datos.service';
import { GetRecipesService } from '../services/get-recipes.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-lista-frutas',
  templateUrl: './lista-frutas.page.html',
  styleUrls: ['./lista-frutas.page.scss'],
})
export class ListaFrutasPage implements OnInit {

  //Declaramos las propiedades del componente

  frutaSeleccionada:string;
  lista_recetas: Array<Receta>;
  lista_aux: Array<Receta>;
  lista_recetas_frutaSeleccionada: Array<Receta>;

  muestraBeneficios: boolean = false;
  infoBeneficios: Array<Fruta>;
  pina: Fruta;
  manzana: Fruta;
  fresa: Fruta;
  mango: Fruta;
  papaya: Fruta;
  cereza: Fruta;
  melon: Fruta;
  sandia: Fruta;
  melocoton: Fruta;
  limon: Fruta;
  platano: Fruta;
  frutaActual: Fruta;

  filtrar: boolean=false
  filtro_activo:boolean=false;
  backLink: string = 'lista-frutas';

  //Inyectamos las dependencias de servicios en el constructor e inicializamos propiedades
  constructor(private servicio_comunicar_datos:ComunicarDatosService,
    private servicio_get_recipes:GetRecipesService,
    private servicio_storage:StorageService) {
      this.pina = new Fruta();
      this.manzana = new Fruta();
      this.fresa = new Fruta();
      this.mango = new Fruta();
      this.papaya = new Fruta();
      this.cereza = new Fruta();
      this.melon = new Fruta();
      this.sandia = new Fruta();
      this.melocoton = new Fruta();
      this.limon = new Fruta();
      this.platano = new Fruta();
      this.frutaActual = new Fruta();

      this.infoBeneficios = new Array<Fruta>();
    
    }

  ngOnInit() {
  }

  //Actualizamos los valores para que una vez que el componente llegue a este punto del ciclo de vida, funcione todo correctamente

  async ionViewWillEnter(){
    this.backLink = await this.servicio_storage.get('backLink')
    this.frutaSeleccionada = this.servicio_comunicar_datos.nombreFruta;
    this.creaFruta();    
    this.buscaFruta();
    this.lista_recetas = new Array<Receta>();
    this.lista_recetas_frutaSeleccionada = new Array<Receta>();
    this.lista_aux = new Array<Receta>();
    this.getRecipesByFruit();
  }

  //Actualizamos los valores necesarios una vez que el usuario abandone la página
  ionViewWillLeave(){
    this.servicio_storage.set('backLink', this.backLink);
    this.filtro_activo = false;
    this.muestraBeneficios = false;
  }

  //Le pasamos a la función los datos que obtenemos tras hacer las consulta al JSON alojado en el servidor,
  //se recorre cada elemento, y se ve si en el array de ingredientes, incluye la fruta seleccionada.
  filtrarPorFruta(data:any){
    let recetas = data.recetas;
    recetas.forEach(item =>{
      if(item.ingredientes.includes(this.frutaSeleccionada)){
        this.lista_recetas_frutaSeleccionada.push(item);
      }
    })
  }

  //Esta función se dispara al hacer click en alguna de las opciones del filtro.
  //Se le pasa por parámtro el tipo de bebida seleccionado, y mira en el array en el que almacenamos todas las recetas,
  //cuales tienen el mismo tipo de bebida que le hemos pasado por parámetro. Se almacenan en un array para, a continuación, mostrarlas
  filtrarPorTipoBebida(b:string){
    this.cambiarEstadoFiltrar();
    this.lista_recetas_frutaSeleccionada.forEach(item =>{
      if(item.tipoBebida == b){
        this.lista_aux.push(item)
      }
    })
  }

  //A través del servicio get recipes, obtenemos las recetas almacenadas en el servidor.
  //Se deserializa la respuesta
  //Se filtran por fruta
  //Si ha habido un error, se capta y lo muestra por consola
  getRecipesByFruit(){
    this.servicio_get_recipes.getRecipes()
    .then(respuesta => respuesta.json())
    .then(data=> this.filtrarPorFruta(data))
    .catch(error=> console.log(error))
  }

    //Al hacer click en el botón de una de las recetas, se obtiene su nombre, y se le pasa como parámetro a esta función.
  //Ella se encargará de buscarla en el array en el que están almacenadas todas las favoritas y almacena los datos en el servicio,
  //para ponerlos a disposición en el componente que corresponda.

  comunicarDatos(r:string){
    this.lista_recetas_frutaSeleccionada.forEach(item=>{
      if(r == item.nombre){
        this.servicio_comunicar_datos.currentRecipe = item;
        console.log('nombre receta ' + this.servicio_comunicar_datos.currentRecipe.nombre);
      }
    })
  }

  //Controlamos las propiedades booleanas para mostrar o dejar de mostrar el filtro
  cambiarEstadoFiltrar(){
    if(!this.filtrar) {
      this.muestraBeneficios = false;
      this.filtrar = true;
      this.filtro_activo = false;
    }else{
      this.filtrar = false;
      this.filtro_activo =true
    };
  }

  //Controlamos las variables booleanas para mostrar o dejar de mostrar la información de la fruta.
  cambiarEstadoMuestraInformacion(){
    if(!this.muestraBeneficios) {
      this.muestraBeneficios = true;
    }else{
      this.muestraBeneficios = false;
    };
  }

  //Seteamos los valores de cada objeto de tipo fruta, una propiedad creada para almacenar estructuradamente la información de las frutas
  creaFruta(){
    this.pina.nombre = 'pina';
      this.pina.titulo = 'Piña';
      this.pina.tituloBeneficios = 'Algunos beneficios y propiedades de la piña';
      this.pina.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.manzana.nombre = 'manzana';
      this.manzana.titulo = 'Manzana';
      this.manzana.tituloBeneficios = 'Algunos beneficios y propiedades de la manzana';
      this.manzana.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.fresa.nombre = 'fresa';
      this.fresa.titulo = 'Fresa';
      this.fresa.tituloBeneficios = 'Algunos beneficios y propiedades de la fresa';
      this.fresa.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.mango.nombre = 'mango';
      this.mango.titulo = 'Mango';
      this.mango.tituloBeneficios = 'Algunos beneficios y propiedades del mango';
      this.mango.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.papaya.nombre = 'papaya';
      this.papaya.titulo = 'Papaya';
      this.papaya.tituloBeneficios = 'Algunos beneficios y propiedades de la papaya';
      this.papaya.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.cereza.nombre = 'cereza';
      this.cereza.titulo = 'Cereza';
      this.cereza.tituloBeneficios = 'Algunos beneficios y propiedades de la cereza';
      this.cereza.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.melon.nombre = 'melon';
      this.melon.titulo = 'Melón';
      this.melon.tituloBeneficios = 'Algunos beneficios y propiedades del melón';
      this.melon.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.sandia.nombre = 'sandia';
      this.sandia.titulo = 'Sandía';
      this.sandia.tituloBeneficios = 'Algunos beneficios y propiedades de la sandía';
      this.sandia.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.melocoton.nombre = 'melocoton';
      this.melocoton.titulo = 'Melocotón';
      this.melocoton.tituloBeneficios = 'Algunos beneficios y propiedades del melocotón';
      this.melocoton.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.limon.nombre = 'limon';
      this.limon.titulo = 'Limón';
      this.limon.tituloBeneficios = 'Algunos beneficios y propiedades del limón';
      this.limon.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];

      this.platano.nombre = 'platano';
      this.platano.titulo = 'Plátano';
      this.platano.tituloBeneficios = 'Algunos beneficios y propiedades del plátano';
      this.platano.beneficios = ['Beneficio 1', 'Beneficio 2', 'Propiedad 1', 'Propiedad 2'];
      
      this.infoBeneficios =[ this.pina, this.manzana, this.fresa, this.mango, this.papaya, this.cereza, this.melon, this.sandia, this.melocoton, this.limon, this.platano]
   
  }

  //Buscamos la fruta seleccionada para mostrar su información
  buscaFruta(){
    this.infoBeneficios.forEach(f => {
      if(this.frutaSeleccionada == f.nombre){
        this.frutaActual =  f;
      }
    })
  }
}
