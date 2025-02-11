import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountServices = inject(AccountService);
  const toaster = inject(ToastrService);

  if(accountServices.currentUser()){

  return true;

  }else{
    toaster.error("You cant pass")
    return false;
  }
  
};


