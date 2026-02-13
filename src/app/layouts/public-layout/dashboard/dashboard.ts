import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAnchor, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { User } from '../../../services/user';
import { Reserva } from '../../../services/reserva';
import { MatCardModule } from '@angular/material/card';
import { Espacio } from '../../../services/espacio';
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservar } from './modal-reservar/modal-reservar';
import { A11yModule } from "@angular/cdk/a11y";
import { ModalMostrarFolio } from './modal-mostrar-folio/modal-mostrar-folio';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatMiniFabButton,
    MatTooltipModule,
    A11yModule,
    MatAnchor
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy{

  // 1. Declaramos la variable para guardar el ID del intervalo
  private intervalId: any;

  reservas: any = [];
  espacios: any = [];
  mostrar_solo_disponibles = true;

  constructor(
    private cd: ChangeDetectorRef,
    private userService: User,
    private reservaService: Reserva,
    private espacioService: Espacio,
    private matDialog: MatDialog
  ){
    
  }

  ngOnInit():void{
    this.iniciarRepeticion();
  }

  iniciarRepeticion():void{

    this.getEspacios();
    // 2. Guardamos el ID que devuelve el setInterval
    this.intervalId = setInterval(() => {
      this.getEspacios();
    }, 3000); // Cada 3 segundos
  
  }

  ngOnDestroy(): void {

    //3. Liberamos el intervalo
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

  }

  cambiar():void{
    this.mostrar_solo_disponibles = !this.mostrar_solo_disponibles;
  }
  getReservas():void{
    this.reservaService.getReservas(this.userService.getToken).subscribe((response: any) => {
      this.reservas = response;
      this.cd.detectChanges();
    });
  }

  getEspacios():void{
    this.espacioService.getEspacios(this.mostrar_solo_disponibles, this.userService.getToken()).subscribe((response: any) => {
      console.log("🚀 ~ Dashboard ~ getEspacios ~ response:", response)
      this.espacios = response;
      this.cd.detectChanges();
    }, (badResponse: any) => {

      if(badResponse.status == 401){

        this.userService.sesionExpired();
        return;

      }
      
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se logro obtener los espacios",
        footer: "Estamos teniendo problemas para identificar el error..." 
      })
    });
  }

  logout():void{
    this.userService.loguot();
  }

  abrirModalReservar(id_espacio: number, capacidad: number):void{
    this.matDialog.open(ModalReservar, {
      width: '1000px',
      height: '50vh',
      maxWidth: '1500px',
      maxHeight: '80vh',
      disableClose: true,
      // Opcional: para que el contenido no se desborde feo
      panelClass: 'custom-modal-container',
      data: {
        id_espacio: id_espacio,
        capacidad: capacidad
      }
    }).afterClosed().subscribe((response: any) => {
      console.log("🚀 ~ Dashboard ~ abrirModalReservar ~ response:", response)
      
      if(response){

        Swal.fire({
            icon: "success",
            title: `Reserva agendada con éxito, su folio es <b>#${response.id_reserva}</b>`,
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });

        // then(() => {

        //   this.matDialog.open(ModalMostrarFolio, {
        //   // En móviles ocupará el 90% del ancho, en PC máximo 500px (ideal para un folio)
        //     width: '90%', 
        //     maxWidth: '500px', 
            
        //     // Evita usar height fijo si el contenido es poco, 
        //     // es mejor que el modal se ajuste al contenido automáticamente
        //     height: 'auto', 
        //     maxHeight: '90vh',
        //     disableClose: true,
        //     data: {
        //       id_reserva: response.id_reserva
        //     }
        //   });

        // });
        
      }
      
    });
  }
}
