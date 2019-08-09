import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var configuracion: any;

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url: string;

  constructor(private http: HttpClient) {
    // this.url = (configuracion) ? configuracion.url : 'http://localhost:3000/';
    this.url = 'http://localhost:3000/';
  }

  get(path: string, params?: any) {
    return this.http.get(this.url + path, { params: params });
  }

  getAsync(path: string, params?: any) {
    return this.http.get(this.url + path, { params: params }).toPromise();
  }

  post(path: string, body: any, params?: any) {
    return this.http.post(this.url + path, body, { params: params });
  }
}
