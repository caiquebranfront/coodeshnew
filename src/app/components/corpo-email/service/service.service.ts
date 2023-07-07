import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorpoEmailService {

    private apiUrl = 'https://dropmail.me/api/graphql/';
    private authToken = 'web-test-202307037OCJk'; 
    sessionId = '';

    constructor(private http: HttpClient) { }

    setEmailSessionId(sessionId: string) {
      this.sessionId = sessionId;
    }


    getEmails() {
      const query = `
        query {
          session(id: "${this.sessionId}") {
            mails {
              rawSize
              fromAddr
              toAddr
              downloadUrl
              text
              headerSubject
            }
          }
        }
      `;

      const params = new HttpParams().set('query', query);

      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${this.authToken}`);

      return this.http.get(`${this.apiUrl}`, { headers, params });
    }
  }
