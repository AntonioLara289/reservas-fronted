import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-mostrar-folio',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInput,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatButtonModule
],
  templateUrl: './modal-mostrar-folio.html',
  styleUrl: './modal-mostrar-folio.css',
})
export class ModalMostrarFolio {

  data = inject(MAT_DIALOG_DATA);

  folioControl = new FormControl('');

  constructor(){

    this.folioControl.setValue(this.data.id_reserva);

  }

}
