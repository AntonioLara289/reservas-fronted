import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Reserva } from '../../../services/reserva';
import { User } from '../../../services/user';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarReserva } from './modal-editar-reserva/modal-editar-reserva';

@Component({
  selector: 'app-administracion-reservas',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  templateUrl: './administracion-reservas.html',
  styleUrl: './administracion-reservas.css',
})
export class AdministracionReservas implements OnInit{

  reservas: any;
  constructor(
    private cd: ChangeDetectorRef,
    private reservaService: Reserva,
    private userService: User,
    private matDialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas():void{

    this.reservaService.getReservas(this.userService.getToken()).subscribe((response: any) => {

      this.reservas = response;
      this.cd.detectChanges();

    }, (badResponse: any) => {

      if(badResponse.status == 401){

        this.userService.sesionExpired();
        return;

      }
      
        Swal.fire({
          icon: "error",
          title: "Algo salió mal",
          text: "No se logro obtener las reservas",
          footer: "Estamos teniendo problemas para identificar el error..." 
        })

    });

  }

  abrirModalCambiarEstatus(estatus: number, id_reserva: number):void{

    let titulo = "";
    let texto = "";
    let boton_aceptar = "";

    if(estatus == 2){
      titulo = "Aceptar reservación";
      texto = "¿Está segur@ de aceptar la reservación?";
      boton_aceptar = "Aceptar";
    }

    if(estatus == 3){
      titulo = "Rechazar reservación";
      texto = "¿Está segur@ de rechazar la reservación?";
      boton_aceptar = "Rechazar";
    }

    if(estatus == 4){
      titulo = "Liberar reservación";
      texto = "¿Está segu@ de liberar la reservación?";
      boton_aceptar = "Liberar";
    }

    Swal.fire({
      title: titulo,
      text: texto,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: boton_aceptar,
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((response) => {

      if(response.isConfirmed){

        let form: any = {
          id_reserva: id_reserva,
          estatus: estatus
        };

        this.cambiarEstatus(form);
      }
      
    })
  }

  cambiarEstatus(form: any):void{
    this.reservaService.cambiarEstatus(form, this.userService.getToken()).subscribe((response: any) => {

      let titulo = "";
      let texto = ""; 

      if(form.estatus == 2){
        titulo = "Reservación aceptada";
        texto = "La reservación fue aceptada con éxito";
      }

      if(form.estatus == 3){
        titulo = "Reservación rechazada";
        texto = "La reservación fue rechazada con éxito"
      }

      if(form.estatus == 4){
        titulo = "Reservación liberada";
        texto = "La reservación fue liberada con éxito"
      }

      Swal.fire({
        title: titulo,
        text: texto,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      this.getReservas();

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

  abrirModalEditar(reservacion: any):void{
    console.log("🚀 ~ AdministracionReservas ~ abrirModalEditar ~ reservacion:", reservacion)
    
    this.matDialog.open(ModalEditarReserva, {
      width: '1000px',
      height: '50vh',
      maxWidth: '1500px',
      maxHeight: '80vh',
      disableClose: true,
      // Opcional: para que el contenido no se desborde feo
      panelClass: 'custom-modal-container',
      data: {
        reservacion: reservacion
      }
    }).afterClosed().subscribe((response: any) => {
      
      if(response){
        Swal.fire({
          position: 'top-end',  
          icon: "success",
          title: `<b>Reserva actualizada con éxito</b>`,
          showConfirmButton: false,
          timer: 2000
          // confirmButtonText: "Aceptar"
        });

        this.getReservas();
      }
    });
    
  }
}
