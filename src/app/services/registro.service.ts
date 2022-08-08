import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export interface registroUser {
  nombreregistro: string
  estadoregistro: string
  emailregistro: string
  telefonoregistro: string
}


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URLService: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'Authorization': 'Basic ' + btoa('admin:admin'),
      }),
    };
    registro(milog:registroUser) {

      const body = new HttpParams()
        .set('nombre', milog.nombreregistro)
        .set('estado', milog.estadoregistro)
        .set('correo', milog.emailregistro)
        .set('telefono', milog.telefonoregistro);
      
        return this.http.post(`${this.URLService}/regusr`,body.toString(),this.httpOptions);
    }

}
