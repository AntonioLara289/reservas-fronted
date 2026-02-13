import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Espacio {

  api_url = environment.api_url;

  constructor(
    private http: HttpClient,
    private userService: User
  ){

  }

  public getEspacios(mostrar_solo_disponibles : boolean, token: any):Observable<any>{
    let params = new HttpParams().set('mostrar_solo_disponibles', mostrar_solo_disponibles );
    return this.http.get(this.api_url + "espacios/get", 
      {params: params, headers: new HttpHeaders().set('Authorization', "Bearer " + token)})
  }
}
