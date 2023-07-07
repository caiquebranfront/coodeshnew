import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CriaEmailService } from './service/cria-email.service';
import { CorpoEmailService } from '../corpo-email/service/service.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-cria-email',
  templateUrl: './cria-email.component.html',
  styleUrls: ['./cria-email.component.sass']
})
export class CriaEmailComponent implements OnInit{
  isCopied: boolean = false;
  address: string | undefined;
  sessionId: string = '';
  latestEmails: any[] = [];

  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef<HTMLInputElement>;
  countdown: number = 15;
  countdownInterval: any;
  notifyOptions: any;

  ngOnInit() {
    this.startCountdown();
    this.address = this.localStorageService.get('email') as string;

    if (this.address) {
      this.criaEmailService.checkEmailValidity(this.address).subscribe((response: any) => {
        if (response?.data?.isValid && response?.data?.config) {
          this.notifyOptions = response.data.config.notifyOptions ?? null;
        } else {

          this.localStorageService.remove('email');
        }
      });
    }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.countdown = 15;
        this.startCountdown();
      }
    }, 1000);
  }
  constructor(private criaEmailService: CriaEmailService,private localStorageService: LocalStorageService) {}

  copyToClipboard(): void {
    if (this.emailInput && this.emailInput.nativeElement) {
      this.emailInput.nativeElement.select();
      document.execCommand('copy');
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    }
  }




      createTemporaryLink() {
        this.criaEmailService.createTemporaryAddress().subscribe((response: any) => {
          const email = response?.data?.introduceSession?.addresses?.[0]?.address;

          if (response?.data?.introduceSession?.expiresAt < new Date()) {

            return;
          }

          this.address = email;

          if (response?.data?.config) {
            this.notifyOptions = response.data.config.notifyOptions ?? null;
          }

          this.localStorageService.set('email', email);
        });
      }
    }












