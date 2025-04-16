import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgIf} from '@angular/common';

export type Form = {
  name: string;
  lastname: string;
  date: Date;
  tech: 'angular' | 'react' | 'vue';
  version: number;
  email: string;
  hobbies: string;
}

@Component({
  selector: 'app-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class FormComponent {
  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    tech: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    hobbies: new FormControl('', [Validators.required]),
  });

  result: {message: string} = {message: ""};

  onSubmit() {
    if (!this.applyForm.value.name || !this.applyForm.value.lastname || !this.applyForm.value.date || !this.applyForm.value.tech || !this.applyForm.value.version || !this.applyForm.value.email || !this.applyForm.value.hobbies) {
      this.result = { message: "Please fill all fields" };
      return;
    }

    const data = this.applyForm.value;

    console.log(data);
  }
}
