import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Reserva } from '../../../../services/reserva';
import { User } from '../../../../services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-reservar',
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
  templateUrl: './modal-reservar.html',
  styleUrl: './modal-reservar.css',
})
export class ModalReservar {

  data = inject(MAT_DIALOG_DATA);
  minDate: Date = new Date();
  
  formulario: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private reservaService: Reserva,
    private userService: User,
    private dialogRef: MatDialogRef<ModalReservar>
  ){
    
    this.formulario = this.fb.group({
      solicitante: ['', Validators.required, Validators.minLength(3)],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required, Validators.minLength(10)]
    });
    
  }

  reservar():void{

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    // const controls = this.formulario.controls;
    // Object.keys(controls).forEach(key => {
    //   const control = controls[key];
    //   console.log(`Control Name: ${key}, Value: ${control.value}`);
    //   // Perform actions like setting validators, marking as dirty, etc.
    //   // control.markAsDirty();
    // });

    const fecha = this.obtenerFechaCompleta();
    const hora = this.obtenerFechaCompleta();
    

    let form = {
      key_espacio: this.data.id_espacio,
      fecha: fecha,
      hora: hora,
      descripcion: this.formulario.get('descripcion')?.value, 
      solicitante: this.formulario.get('solicitante')?.value
    }

    this.reservaService.reservar(form, this.userService.getToken()).subscribe({
      next: (response: any) => {

        this.dialogRef.close(response);
      },
      error: (badResponse: any) => {

      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se logró agendar la reservación",
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

  extraerHora(date: any): string {
    if (!date) return '';
    
    // Si por alguna razón recibes un string, lo convertimos a Date
    const d = (date instanceof Date) ? date : new Date(date);

    const horas = d.getHours().toString().padStart(2, '0');
    const minutos = d.getMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`; // Retorna "14:00", "09:30", etc.
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
