import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _router = inject(Router)
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem("isLoggin") === 'true';
    if(!isLoggedIn){
      _router.navigate(['login'])
      return false;
    }
    return true;
  }
  _router.navigate(['login']);
  return false;
};
