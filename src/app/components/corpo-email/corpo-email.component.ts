import { Component } from '@angular/core';
import { CorpoEmailService } from './service/service.service';
import { interval, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-corpo-email',
  templateUrl: './corpo-email.component.html',
  styleUrls: ['./corpo-email.component.sass']
})
export class CorpoEmailComponent {
  latestEmails: any[] = [];
  notificationsEnabled = false;

  constructor(private corpoEmailService: CorpoEmailService) { }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    this.corpoEmailService.getEmails().subscribe((response: any) => {
      this.latestEmails = response.data.session.mails;
    });
  }
  toggleNotifications() {
    if (this.notificationsEnabled) {

    } else {

      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('DropMail', {
              body: 'Você receberá notificações quando um novo email chegar.',
              icon: 'caminho-para-o-icone.png'
            });
          });
        }
      });
    }
    this.notificationsEnabled = !this.notificationsEnabled;
  }
}
