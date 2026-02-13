import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../../services/user';
import { Reserva } from '../../../../services/reserva';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar-reserva',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './modal-editar-reserva.html',
  styleUrl: './modal-editar-reserva.css',
})
export class ModalEditarReserva{

  data = inject(MAT_DIALOG_DATA);

  formulario: FormGroup;

  minDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditarReserva>,
    private userService: User,
    private reservaService: Reserva
  ){

    this.formulario = this.fb.group({
      solicitante: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });

    if (this.data?.reservacion) {
        this.formulario.patchValue({
          solicitante: this.data.reservacion.solicitante,
          descripcion: this.data.reservacion.descripcion,
          fecha: new Date(this.data.reservacion.fecha),
          hora: new Date(this.data.reservacion.hora)
        });
      }
      
      console.log("🚀 ~ ModalEditarReserva ~ constructor ~ new Date(this.data.reservacion.hora):", new Date(this.data.reservacion.hora))
      console.log("🚀 ~ ModalEditarReserva ~ constructor ~ new Date(this.data.reservacion.fecha):", new Date(this.data.reservacion.fecha))
  }

  actualizar():void{

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    const fecha = this.obtenerFechaCompleta();
    const hora = this.obtenerFechaCompleta();

    console.log("🚀 ~ ModalEditarReserva ~ actualizar ~ this.data:", this.data)
    let form = {
      id_reserva: this.data.reservacion.id_reserva,
      key_espacio: this.data.reservacion.key_espacio,
      fecha: fecha,
      hora: hora,
      descripcion: this.formulario.get('descripcion')?.value, 
      solicitante: this.formulario.get('solicitante')?.value
    }

    this.reservaService.actualizarReserva(form, this.userService.getToken()).subscribe({
      next: (response: any) => {

        this.dialogRef.close(response);

      },
      error: (badResponse: any) => {

      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se logró actualizar la reservación",
        footer: "Estamos teniendo problemas para identificar el error..." 
        });
      }

    });


  }


  formatearFecha(date: Date):string{
    const anio = date.getFullYear();
    const mes = date.getMonth();
    const dia = date.getDay();

    return anio + "-" + mes + "-" + dia;
  }

  obtenerFechaCompleta():Date{

    const fecha = this.formulario.get('fecha')?.value; // Ejemplo: 2026-02-12
    const hora = this.formulario.get('hora')?.value;   // Objeto Date del Timepicker

    const fechaCompleta = new Date(fecha);
    
    // Le seteamos las horas y minutos del timepicker
    fechaCompleta.setHours(hora.getHours());
    fechaCompleta.setMinutes(hora.getMinutes());

    return fechaCompleta;
  }

}
