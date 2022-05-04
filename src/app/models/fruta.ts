export class Fruta {
    nombre: string;
    titulo: string;
    tituloBeneficios: string;
    beneficios: Array<string>;

    constructor(){
        this.nombre = '';
        this.titulo = '';
        this.tituloBeneficios = '';
        this.beneficios = new Array<string>();
    }
}
