import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class User {
  
  api_url: string = "";
  localStorageKey = "reservas_data";
  localStorageTokenKey = "reservas_token";
  private platformId = inject(PLATFORM_ID);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ){

    this.api_url = environment.api_url;
  }

  guardarUsuario(data: any):void{
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  guardarToken(token: any):any{
    localStorage.setItem(this.localStorageTokenKey, token);
  }

  getToken():any|null{

    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem(this.localStorageTokenKey);
    }

    return null;
  }

  getUsuario():any | null{
    
    if (isPlatformBrowser(this.platformId)) {

      const data = localStorage.getItem(this.localStorageKey);

      // if(data){
        return JSON.parse(data!);
      // }
    }

    return null;
  }

  login(form: any):Observable<any>{
    return this.httpClient.post(this.api_url + "usuario/login", form);
  }

  loguot():void{
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.localStorageTokenKey);
    this.router.navigate(['login']);
  }

  sesionExpired():void{
    localStorage.removeItem(this.localStorageTokenKey);
    localStorage.removeItem(this.localStorageKey);

    Swal.fire({
      title: "Sesión Expirada",
      text: "Por favor inicie sesión de nuevo",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Iniciar"
    }).then(() => {
      this.router.navigate(['login']);
    });
  }
}

