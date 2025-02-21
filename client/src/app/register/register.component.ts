import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DateInputComponent } from '../_forms/date-input/date-input.component';  // Import the DateInputComponent
import { NgIf, NgFor } from '@angular/common';  // Import directives like NgIf and NgFor

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, DateInputComponent, NgIf, NgFor]  // Use components and directives here
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string) {
    return (control: any) => {
      const parent = control?.parent;
      return control?.value === parent?.get(matchTo)?.value ? null : { isMatching: true };
    };
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ =>  this.router.navigateByUrl('/members'),
      error: error => this.validationErrors = error,
    });
  }

  private getDateOnly(dob: string | undefined){
    if(!dob)return;
    return new Date(dob).toISOString().slice(0,10);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
