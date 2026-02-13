import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../user';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(User);
  const user_loggued = userService.getUsuario() != "null" ? true : false;
  
  if(!user_loggued){
    router.navigate(['/login']);
    return false;
  }
  
  if (state.url.includes('administracion-reservas')) {
    
    const role = userService.getUsuario().rol;

    if(role != 1){
      router.navigate(['/dashboard']); // Lo mandas al dashboard normal si no es admin
      return false;
    }

  }
  
  return true;
};
