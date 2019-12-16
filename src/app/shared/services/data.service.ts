import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  getTimeOptions() {
    return [
      {Id: 'HY', Descripcion: 'Hoy'},
      {Id: 'UD', Descripcion: 'Último 7 días'},
      {Id: 'MA', Descripcion: 'Mes Actual'},
      {Id: 'MP', Descripcion: 'Mes Anterior'},
      {Id: 'EF', Descripcion: 'Perzonalida'},
    ];
  }

  getParseObject(data: any) {
    let arrayValues = [];
    for (let key in data) {
      arrayValues.push(data[key]);
    }
    return arrayValues;
  }
}
