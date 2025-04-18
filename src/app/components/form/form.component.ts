import {Component, signal} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { FormService } from '../../servises/form.service';
import {HobbiesComponent} from '../hobbies/hobbies.component';

export type Form = {
  name: string;
  lastname: string;
  date: Date;
  tech: string;
  version: number;
  email: string;
  hobbies: Hobby[];
}

export type Hobby = {
  name: string;
  duration: number;
}

@Component({
  selector: 'app-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, NgIf, NgFor, HobbiesComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class FormComponent {

  private hobbies: Hobby[] = [];

  changeHobbies(newHobbies: Hobby[]) {
    this.hobbies = newHobbies;
    console.log(this.hobbies);
  }

  constructor(private formService: FormService) {
    this.applyForm.get('tech')?.valueChanges.subscribe(value => {
      this.selectedTech = value;
      this.applyForm.get('version')?.reset();
    });
  }

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    tech: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  result: { message: string } = { message: "" };

  versionValues: { [key: string]: string[] } = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  selectedTech: string | null = null;

  onSubmit() {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      this.result = { message: "Please fix the errors in the form" };
      return;
    }

    if(this.hobbies.length === 0) {
      this.result = { message: "Please add at least one hobby" };
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
      hobbies: this.hobbies,
    }
    this.formService.checkData(newData).subscribe(response => {
      this.result = response;
    });

    console.log(newData);
  }
}
