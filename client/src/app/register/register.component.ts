import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   usersFromHomeComponent = input.required<any>()
   cancleRegister = output<boolean>();
  model: any = {}


  register(){
    console.log(this.model);
  }

  cancel(){
    this.cancleRegister.emit(false)
  }
}
