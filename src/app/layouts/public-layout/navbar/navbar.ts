import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../services/user';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { Reserva } from '../../../services/reserva';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  userService = inject(User);
  isAdmin = false;

  constructor(
    private reservaService: Reserva
  ){

    if(this.isLoggued()){
      this.isAdmin = this.userService.getUsuario().rol == 1 ? true : false; 
    }
  }
  logout():void{
    this.userService.loguot();
  }

  isLoggued(){
    return this.userService.getUsuario() != null;
  }

  // Agregamos 'async' antes de la definición de la función
  async abrirModalSolicitarFolio(): Promise<void> {
    const { value: folio } = await Swal.fire({
      title: "Consultar reservación",
      input: "number",
      inputLabel: "Folio",
      inputPlaceholder: "Introduzca el folio de la reserva",
      showCancelButton: true, // Para que puedan cerrar el modal sin error
      inputValidator: (value) => {
        if (!value) {
          return "¡Debes escribir un folio!"; // Validación rápida dentro del SweetAlert
        }
        return null;
      }
    });

    if (folio) {
      // Aquí es donde llamarías a tu servicio de Laravel
      // this.consultarFolioEnBackend(folio);
      this.consultarReserva(folio);
    }
  }
  // isAdmin():boolean{
  //   const role = this.userService.getUsuario().rol;

  //   if(role == 1){
  //     return true;
  //   }

  //   return false;
  // }

  consultarReserva(folio: number):any{
    this.reservaService.consultarReserva(folio, this.userService.getToken()).subscribe((response: any) => {

      Swal.fire({
        icon: "info",
        title: "<b>Consulta de reservación</b>",
        text: `Estatus: ${response.reserva_str}`,
      })
    }, (badResponse: any) => {

      if(badResponse.status == 401){
      
        this.userService.sesionExpired();
        return;

      }
            
      Swal.fire({
          icon: "error",
          title: "Algo salió mal",
          text: "No se logro actualizar la reserva",
          footer: "Estamos teniendo problemas para identificar el error..." 
      });
      
    });
  }
}
