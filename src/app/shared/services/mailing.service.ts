import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {membershipFormDataModel} from '../models/membershipForm.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MailingService {
  private api: string = 'https://mailthis.to/karina.t.delcheva@gmail.com';

  constructor( private http: HttpClient) { }

  postMessage(formData: membershipFormDataModel) {

    return this.http.post(this.api, {
      email: formData.email,
      _subject: `ФОРМА ЗА ЧЛЕНСТВО CELEBRITY CLUB ЗА ${formData.companyName}`,
      message: JSON.stringify(formData) 
    }, {headers: {'Access-Control-Allow-Origin':'*',}, responseType: 'text'}).pipe(
      map(
        (response) => {
          return response;
        }, 
        (error) => {
          alert(error.message);
          return error
        }
      )
    )
  }
}
