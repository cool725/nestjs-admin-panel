import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  items = [
    {
      title: 'company',
      path: '/auth/login',
    },
    {
      title: 'partner-page',
      path: '/auth/login-partners',
    },
    {
      title: 'support',
      path: '/auth/login-partners',
    },
  ];

}
