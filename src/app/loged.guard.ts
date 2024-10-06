import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const logedGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if(localStorage.getItem('token')!== null){
    _Router.navigate(['/home'])
    return false;  }
    else{
      return true;
  }
};