import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRecipesService {

  ruta_servidor:string = 'https://cuckoosnestoriginal.com/disfrutalafruta/disfrutalafruta.php'
  constructor() { }

  //Obtenemos los datos de las recetas alojadas en el servidor.
  getRecipes():Promise<Response>{
    return fetch(this.ruta_servidor)
  }
}
