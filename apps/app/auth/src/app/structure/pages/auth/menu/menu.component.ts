import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  items = [
    {
      title: 'Unternehmen',
      path: 'login-business',
    },
    {
      title: 'Partnerseite',
      path: 'login-partners',
    },
    {
      title: 'Support',
      path: 'login-partners',
    },
  ];
}
