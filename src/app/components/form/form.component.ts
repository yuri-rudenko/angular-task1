import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { FormService } from '../../servises/form.service';


export type Form = {
  name: string;
  lastname: string;
  date: Date;
  tech: string;
  version: number;
  email: string;
  hobbies: string[];
}

@Component({
  selector: 'app-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class FormComponent {

  constructor(private formService: FormService) {

  }

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    tech: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    hobbies: new FormControl('', [Validators.required]),
  });

  result: { message: string } = { message: "" };

  onSubmit() {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      this.result = { message: "Please fix the errors in the form" };
      return;
    }

    this.result = { message: "" };

    const data = this.applyForm.value;
    const newData: Form = {
      name: String(data.name),
      lastname: String(data.lastname),
      date: new Date(String(data.date)),
      tech: String(data.tech),
      version: Number(data.version),
      email: String(data.email),
      hobbies: String(data.hobbies)?.split(','),
    }
    this.formService.checkData(newData).subscribe(response => {
      this.result = response;
    });
    console.log(data);
  }
}
