export class Receta {
    nombre:string;
    tipoBebida: string;
    nombreTipoBebida: string;
    ingredientes:Array<string>;
    listaIngredientes: Array<string>;
    instrucciones: Array<string>;
    isFavorita: boolean;
    realizada: boolean;

    constructor(){
        this.nombre = '';
        this.tipoBebida='';
        this.nombreTipoBebida = '';
        this.ingredientes= new Array<string>();
        this.listaIngredientes = new Array<string>();
        this.instrucciones = new Array<string>();
        this.isFavorita = false;
        this.realizada = false;
    }
}
