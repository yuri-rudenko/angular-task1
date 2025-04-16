import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Form } from '../components/form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private http = inject(HttpClient);

  checkData(data: Form): Observable<{ message: string }> {
    const url = 'https://catfact.ninja/fact';

    return this.http.get(url).pipe(
      map(() => {
        if (data.email === 'test@test.test') {
          return { message: 'User with this email already exists' };
        } else {
          return { message: 'Successfully registered' };
        }
      })
    );
  }

  constructor() { }
}
