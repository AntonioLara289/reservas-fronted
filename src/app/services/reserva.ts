import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Reserva {
 
  localStorageKey = "reservas_data";
  localStorageTokenKey = "reservas_token";

  api_url = environment.api_url;

  token: any;

  constructor(
    private http: HttpClient,
    private userService: User
  ){

  }

  public getReservas(token: any):Observable<any>{
    return this.http.get(this.api_url + "reservas/get", 
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)})
  }

  public reservar(form: any, token: any):Observable<any>{
    return this.http.post(this.api_url + "reservas/crear", form,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    )
  }

  public consultarReserva(id_reserva: number, token: any):Observable<any>{
    return this.http.get(this.api_url + "reservas/consultar?id_reserva=" + id_reserva,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    )
  }
  public actualizarReserva(form: any, token: any):Observable<any>{
    return this.http.put(this.api_url + "reservas/actualizar", form,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    )
  }

  public cambiarEstatus(form: any, token: any):Observable<any>{
    return this.http.put(this.api_url + "reservas/cambiar-estatus", form, 
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    )
  }
}
