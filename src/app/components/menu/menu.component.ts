import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit{
  isMenuOpen: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIsMobile();
  }

  ngOnInit() {
    this.checkIsMobile();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private checkIsMobile() {
    this.isMobile = window.innerWidth <= 767;
    this
}
}
