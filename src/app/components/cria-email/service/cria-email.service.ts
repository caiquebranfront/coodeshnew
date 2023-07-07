import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriaEmailService {
  private endpointUrl = 'https://dropmail.me/api/graphql/';

  constructor(private http: HttpClient) { }

  createTemporaryAddress(): Observable<any> {
    const query = `mutation {
      introduceSession {
        id
        expiresAt
        addresses {
          address
        }
      }
    }`;
    return this.http.post(`${this.endpointUrl}web-test-202307037OCJk`, { query });
  }
  checkEmailValidity(email: string): Observable<any> {
    const query = `query {
      isValidEmail(email: "${email}")
    }`;
    return this.http.post(`${this.endpointUrl}web-test-202307037OCJk`, { query });
  }


}
