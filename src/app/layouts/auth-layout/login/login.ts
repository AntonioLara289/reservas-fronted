import { Component } from '@angular/core';
import { User } from '../../../services/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  formulario: FormGroup;
  constructor(
    private userService: User,
    private fb: FormBuilder,
    private router: Router
  ){

    this.userService.getUsuario() != null ? this.router.navigate(['menu/dashboard']) : 0;

    this.formulario = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required])
    });
    
  }

  login():void{

    if(this.formulario.invalid){
      this.formulario.markAllAsDirty();
      return;
    }

    let form = {
      correo: this.formulario.get('correo')?.value,
      clave: this.formulario.get('clave')?.value
    };

    this.userService.login(form).subscribe((response: any) => {

      this.userService.guardarUsuario(response.usuario);
      this.userService.guardarToken(response.token);

      this.router.navigate(['menu/dashboard'])

    }, (badResponse: any) => {
      
      const clave_error = 2;
      const email_error = 1;

      if(badResponse.error.code == email_error){

        Swal.fire({
          icon: "error",
          title: "El correo no existe",
          text: "Verifique el correo proporcionado",
        });

        return;

      }

      if(badResponse.error.code == clave_error){

        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta",
          text: "La contraseña no coincide",
        });

        return;
      }

      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "Estamos teniendo problemas para identificar el error..."
      })
    });
  }
}
