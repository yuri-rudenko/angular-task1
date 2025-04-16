import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Form} from '../components/form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  http = inject(HttpClient)

  checkData(data: Form) {
    const url = 'https://catfact.ninja/fact';
    const result = this.http.get(url);
    if(data.email === "test@test.test") return {message: "User with this email already exists"};
    else return "Succesfuly registered";
  }

  constructor() { }
}
