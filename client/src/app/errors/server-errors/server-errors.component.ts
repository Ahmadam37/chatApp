import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-errors',
  standalone:true,
  imports: [],
  templateUrl: './server-errors.component.html',
  styleUrl: './server-errors.component.css'
})
export class ServerErrorsComponent {
error: any;

constructor(private router:Router){
  const navigation = this.router.getCurrentNavigation();
  this.error = navigation?.extras?.state?.['error']
}
}
