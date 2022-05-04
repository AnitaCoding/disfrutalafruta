//Importamos componentes, módulos, clases y servicios necesarios para el componente

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Receta } from '../models/receta';
import { Insignia } from '../models/insignia';
import { StorageService } from '../services/storage.service';
Chart.register(...registerables);

@Component({
  selector: 'app-insignias',
  templateUrl: './insignias.page.html',
  styleUrls: ['./insignias.page.scss'],
})
export class InsigniasPage implements OnInit {

  //Declaramos las propiedades del componente.

  //Para ver al hijo, se utiliza @ViewChild, y se le pasa por parámtro el identificador del elemento canvas.
  //Cada uno se corresponde con una propiedad en el componente para dotarlo de funcionalidad.
  @ViewChild('zumosCanvas') private zumosCanvas: ElementRef;
  @ViewChild('batidosCanvas') private batidosCanvas: ElementRef;
  @ViewChild('coctelesCanvas') private coctelesCanvas: ElementRef;
  @ViewChild('pinaCanvas') private pinaCanvas: ElementRef;
  @ViewChild('manzanaCanvas') private manzanaCanvas: ElementRef;
  @ViewChild('fresaCanvas') private fresaCanvas: ElementRef;
  @ViewChild('mangoCanvas') private mangoCanvas: ElementRef;
  @ViewChild('papayaCanvas') private papayaCanvas: ElementRef;
  @ViewChild('cerezaCanvas') private cerezaCanvas: ElementRef;
  @ViewChild('melonCanvas') private melonCanvas: ElementRef;
  @ViewChild('sandiaCanvas') private sandiaCanvas: ElementRef;
  @ViewChild('melocotonCanvas') private melocotonCanvas: ElementRef;
  @ViewChild('limonCanvas') private limonCanvas: ElementRef;
  @ViewChild('platanoCanvas') private platanoCanvas: ElementRef;

  //Declaramos arrays para almacenar las recetas por tipo de bebida
  zumosRealizados: Array<Receta>;
  batidosRealizados: Array<Receta>;
  coctelesRealizados: Array<Receta>;

  //Declaramos las propiedades de tipo Insignia, una clase creada para almacenar datos de forma estructurada de cada insignia.
  zumosInsignia: Insignia;
  batidosInsignia: Insignia;
  coctelesInsignia: Insignia;
  pinaInsignia: Insignia;
  fresaInsignia: Insignia;
  manzanaInsignia: Insignia;
  mangoInsignia: Insignia;
  papayaInsignia: Insignia;
  cerezaInsignia: Insignia;
  melonInsignia: Insignia;
  sandiaInsignia: Insignia;
  melocotonInsignia: Insignia;
  limonInsignia: Insignia;
  platanoInsignia: Insignia;

  //Declaramos las propiedades de tipo Chart
  zumosChart: Chart;
  batidosChart: Chart;
  coctelesChart: Chart;
  pinaChart: Chart;
  manzanaChart: Chart;
  fresaChart: Chart;
  mangoChart: Chart;
  papayaChart: Chart;
  cerezaChart: Chart;
  melonChart: Chart;
  sandiaChart: Chart;
  melocotonChart: Chart;
  limonChart: Chart;
  platanoChart: Chart;

  //Declaramos array para almacenar las insignias
  arrayInsignias: Array<Insignia>;

  //Declaramos los niveles que van a servir para saber cual es el avance del usuario en cada insignia,
  //y determinar su título actual
  nivel1:number=10;
  nivel2:number=50;
  nivel3:number=100;

  //Se inyectan las dependencias de servicios en el constructor.
  constructor(private servicio_storage:StorageService) {

    //Inicializamos las propiedades declaradas

    this.zumosRealizados = new Array<Receta>();
    this.batidosRealizados = new Array<Receta>();
    this.coctelesRealizados = new Array<Receta>();

    this.zumosInsignia = new Insignia;
    this.batidosInsignia = new Insignia;
    this.coctelesInsignia = new Insignia;
    this.pinaInsignia = new Insignia;
    this.manzanaInsignia = new Insignia;
    this.fresaInsignia = new Insignia;
    this.mangoInsignia = new Insignia;
    this.papayaInsignia = new Insignia;
    this.cerezaInsignia = new Insignia;
    this.melonInsignia = new Insignia;
    this.sandiaInsignia = new Insignia;
    this.melocotonInsignia = new Insignia;
    this.limonInsignia = new Insignia;
    this.platanoInsignia = new Insignia;
  
    this.arrayInsignias = new Array<Insignia>();

    
   }

  ngOnInit() {
  }

  //Genramos las insignias

  async ionViewWillEnter(){
    await this.generarInsignias();    
  }

  //Se obtienen las recetas realizads previamente almacenadas localmente en el dispositivo
  async obtenerRealizadas(){
    let recetasRealizadas = new Array<Receta>();
    if(await this.servicio_storage.get('listaRealizadas')!==null){
      recetasRealizadas = JSON.parse(await this.servicio_storage.get('listaRealizadas'));
    }
    return recetasRealizadas;
  }

  async generarInsignias() {
      //Obtenemos las recetas realizadas, y seteamos los objetos Insignia que almacenan estructuradamente la información.

    let recetasRealizadas = await this.obtenerRealizadas();
    this.setupObjetosInsignia();

    //Si no hay recetas realizadas, se da valor 0 a la propiedad nRealizados de los objetos insignia, para que pinte las insignias,
    //de lo contrario, daría error.
    if(recetasRealizadas == undefined){

      this.arrayInsignias.forEach(r => r.nRealizados = 0)
      
    }else{
      //Si existen recetas realizadas, filtramos el array para saver cuántas se han hecho, teniendo en cuenta lo que se pide en cada insignia.
      this.zumosInsignia.nRealizados = recetasRealizadas.filter(r => r.tipoBebida == 'zumo').length;
      this.batidosInsignia.nRealizados = recetasRealizadas.filter(r => r.tipoBebida == 'batido').length;
      this.coctelesInsignia.nRealizados = recetasRealizadas.filter(r => r.tipoBebida == 'coctel').length;
      this.pinaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'pina');
      this.manzanaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'manzana');
      this.fresaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'fresa');
      this.mangoInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'mango');
      this.papayaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'papaya');
      this.cerezaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'cereza');
      this.melonInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'melon');
      this.sandiaInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'sandia');
      this.melocotonInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'melocoton');
      this.limonInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'limon');
      this.platanoInsignia.nRealizados = this.filtrarPorFruta(recetasRealizadas, 'platano');

    }

    //Se setea el nivel según el número de recetas realizadas de cada hito, y también el título actual según el avance.
    this.arrayInsignias.forEach(r => r.nivel = this.setearNivel(r.nRealizados));
    this.setearTituloActual();

    //Finalmente, con toda la información, se crean las insignias
    this.arrayInsignias.forEach(r => this.crearInsignias(r.nombreChart, r.nombreCanvas, r.nRealizados) );
  }

  //Filtramos las recetas por fruta mirando en el Array de la propiedad ingredientes del objeto si existe la fruta elegida.
  //Devuelve el número de recetas realizadas de esa fruta
  filtrarPorFruta(data:Array<Receta>, fruta: string):number{
    let arrayFiltradoPorFruta = new Array<Receta>();
    data.forEach(item =>{
      if(item.ingredientes.includes(fruta)){
        arrayFiltradoPorFruta.push(item);
      }
    })

    return arrayFiltradoPorFruta.length
  }

  //Seteamos el nivel en función del valor numérico que hemos pasado por parámetro, que será el número de recetas realizadas para ese hito
  setearNivel(n: number):number{
    let nivel: number;
    if(n<this.nivel3 && n<this.nivel2&&n<this.nivel1){
      nivel = this.nivel1;
    }else if (n < this.nivel3 && n < this.nivel2 && n > this.nivel1){
      nivel = this.nivel2;
    } else if(n<this.nivel3 && n > this.nivel2){
      nivel = this.nivel3
    }else{
      nivel = n;
    }

    return nivel;
  }

  //Seteamos el título en función del nivel en que se encuentre
  setearTituloActual(){
    this.arrayInsignias.forEach(r => {
      if(r.nivel == this.nivel1){
        r.tituloActual = r.titulo[0];
      }else if(r.nivel == this.nivel2){
        r.tituloActual = r.titulo[1];
      }else if(r.nivel == this.nivel3){
        r.tituloActual = r.titulo[2];
      }else{
        r.tituloActual = r.titulo[3]
      }
    })
  }

  //Creamos las insignias pasando a cada objeto chart los valors que requiere para crearlos.
  crearInsignias(chartElement:Chart, chartCanvas:ElementRef, n:number){
    let nivel = this.setearNivel(n);
    chartElement = new Chart(chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [n,nivel-n],
          backgroundColor: [
            'rgb(145, 64, 145)',
            'rgba(145, 64, 145, 0.4)'
          ],
          hoverBackgroundColor: [
            'rgba(145, 64, 145, 0.8)',
            'rgba(145, 64, 145, 0.2)'
          ]
        }]
      }
      
    });
  }


  //Seteamos los valores de las propiedades de los objetos insignia, y finalmente, almacenamos todos estos objetos en un array.
setupObjetosInsignia(){
  this.zumosInsignia.titulo = ['Novel en zumos', 'Aprendiz de zumos', 'Master de zumos', 'Leyenda en zumos'];
  this.zumosInsignia.nombreCanvas = this.zumosCanvas;
  this.zumosInsignia.nombreChart = this.zumosChart;
  
  this.batidosInsignia.titulo = ['Novel en batidos', 'Aprendiz de batidos', 'Master de batidos', 'Leyenda en batidos'];
  this.batidosInsignia.nombreCanvas = this.batidosCanvas;
  this.batidosInsignia.nombreChart = this.batidosChart;

  this.coctelesInsignia.titulo =  ['Novel en cóocteles', 'Aprendiz de cócteles', 'Master de cócteles', 'Leyenda en cócteles'];
  this.coctelesInsignia.nombreCanvas = this.coctelesCanvas;
  this.coctelesInsignia.nombreChart = this.coctelesChart;
  
  this.pinaInsignia.titulo = ['Novel en piña', 'Aprendiz de piña', 'Master de piña', 'Leyenda en piña'];
  this.pinaInsignia.nombreCanvas = this.pinaCanvas;
  this.pinaInsignia.nombreChart = this.pinaChart;

  this.manzanaInsignia.titulo = ['Novel en manzana', 'Aprendiz de manzana', 'Master de manzana', 'Leyenda en manzana'];
  this.manzanaInsignia.nombreCanvas = this.manzanaCanvas;
  this.manzanaInsignia.nombreChart = this.manzanaChart;

  this.fresaInsignia.titulo = ['Novel en fresa', 'Aprendiz de fresa', 'Master de fresa', 'Leyenda en fresa'];
  this.fresaInsignia.nombreCanvas = this.fresaCanvas;
  this.fresaInsignia.nombreChart = this.fresaChart;

  this.mangoInsignia.titulo = ['Novel en mango', 'Aprendiz de mango', 'Master de mango', 'Leyenda en mango'];
  this.mangoInsignia.nombreCanvas = this.mangoCanvas;
  this.mangoInsignia.nombreChart = this.mangoChart;

  this.papayaInsignia.titulo = ['Novel en papaya', 'Aprendiz de papaya', 'Master de papaya', 'Leyenda en papaya'];
  this.papayaInsignia.nombreCanvas = this.papayaCanvas;
  this.papayaInsignia.nombreChart = this.papayaChart;
  
  this.cerezaInsignia.titulo = ['Novel en cereza', 'Aprendiz de cereza', 'Master de cereza', 'Leyenda en cereza'];
  this.cerezaInsignia.nombreCanvas = this.cerezaCanvas;
  this.cerezaInsignia.nombreChart = this.cerezaChart;

  this.melonInsignia.titulo = ['Novel en melón', 'Aprendiz de melón', 'Master de melón', 'Leyenda en melón'];
  this.melonInsignia.nombreCanvas = this.melonCanvas;
  this.melonInsignia.nombreChart = this.melonChart;

  this.sandiaInsignia.titulo = ['Novel en sandía', 'Aprendiz de sandía', 'Master de sandía', 'Leyenda en sandía'];
  this.sandiaInsignia.nombreCanvas = this.sandiaCanvas;
  this.sandiaInsignia.nombreChart = this.sandiaChart;

  this.melocotonInsignia.titulo = ['Novel en melocotón', 'Aprendiz de melocotón', 'Master de melocotón', 'Leyenda en melocotón'];
  this.melocotonInsignia.nombreCanvas = this.melocotonCanvas;
  this.melocotonInsignia.nombreChart = this.melocotonChart;

  this.limonInsignia.titulo = ['Novel en limón', 'Aprendiz de limón', 'Master de limón', 'Leyenda en limón'];
  this.limonInsignia.nombreCanvas = this.limonCanvas;
  this.limonInsignia.nombreChart = this.limonChart;

  this.platanoInsignia.titulo = ['Novel en plátano', 'Aprendiz de plátano', 'Master de plátano', 'Leyenda en plátano'];
  this.platanoInsignia.nombreCanvas = this.platanoCanvas;
  this.platanoInsignia.nombreChart = this.platanoChart;

  this.arrayInsignias = [this.zumosInsignia, this.batidosInsignia, this.coctelesInsignia, this.pinaInsignia, this.manzanaInsignia, this.fresaInsignia, this.mangoInsignia, this.papayaInsignia, 
  this.cerezaInsignia, this.melonInsignia, this.sandiaInsignia, this.melocotonInsignia, this.limonInsignia, this.platanoInsignia]
}



}
