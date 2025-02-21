import { NgIf } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl,NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  standalone:true,
  imports: [NgIf, ReactiveFormsModule]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl
  }
  
}