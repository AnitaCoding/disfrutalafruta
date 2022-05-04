import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Este servicio funciona con un plugin de Ionic que permite el alojamiento en la memoria interna de dispositivos móviles.
  //Simplemente, declaramos las funciones que vamos a necesitar a lo largo de los componentes, para poder usarlas.
  constructor(public storage: Storage) {
    this.init();    
  }

  async init() {
    await this.storage.create();
  }

  async get(key:string):Promise<string>{
    let result = await this.storage.get(key);
    return result
  }

  set(key: string, value: any):Promise<any> {
    return this.storage.set(key, value);
  }

  async remove(key:string):Promise<void>{
    this.storage.remove(key)
  }
}