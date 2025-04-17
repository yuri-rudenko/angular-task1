import {Component, inject, Output, output, signal} from '@angular/core';
import {Hobby} from '../form/form.component';
import {NgForOf, NgIf} from '@angular/common';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-hobbies',
  imports: [
    NgForOf,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatFormField
  ],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css'
})
export class HobbiesComponent {

  sendToggled = output<Hobby[]>()

  hobbieForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.hobbieForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  hobies = signal<Hobby[]>([]);

  addHobbie: (hobbie: Hobby) => void = (hobby) => {
    this.hobies.update(hobbies => [...hobbies, hobby])
  }
  deleteHobbie: (hobbie: Hobby) => void = (hobby) => {
    this.hobies.update(hobbies => hobbies.filter(h => h.name !== hobby.name))
    this.sendToggled.emit(this.hobies());
  }

  onSubmit() {
    if (this.hobbieForm.invalid) {
      this.hobbieForm.markAllAsTouched();
      return;
    }

    if (this.hobbieForm.value) {

      this.addHobbie(this.hobbieForm.value as Hobby);

      this.sendToggled.emit(this.hobies());

      console.log(this.hobbieForm.value);

      this.hobbieForm.reset();
    }
  }

}
