import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  private spinnerService = inject(NgxSpinnerService);


  busy(){
    this.busyRequestCount ++ 
    this.spinnerService.show(undefined, {
      type:"ball-climbing-dot",
      bdColor:'rgba(0, 0, 0, 0.8)',
      color:'#33333'
    })
  }

  idel(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

  constructor() { }
}
