import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
 baseURL = "https://localhost:8932/api/"
 private http = inject(HttpClient);
 validationError: string[] = [];



 get400Error(){
  this.http.get(this.baseURL+ 'buggy/bad-request').subscribe({
    next: response => {
      console.log(response);
    },
    error: error => console.error(error)
  })
 }


 get401Error(){
  this.http.get(this.baseURL + 'buggy/auth').subscribe({
    next: response => {
      console.log(response)
    },
    error: error => console.log(error)
  })
 }

 get500Error(){
  this.http.get(this.baseURL + 'buggy/server-error').subscribe({
    next: response => {
      console.log(response)
    },
    error: error => console.log(error)
  })
 }

 get400ValidationError(){
  this.http.post(this.baseURL + 'account/register', {}).subscribe({
    next: response => {
      console.log(response)
    },
    error: error => {
      console.log(error);
      this.validationError = error;
    }
  })
 }

}
