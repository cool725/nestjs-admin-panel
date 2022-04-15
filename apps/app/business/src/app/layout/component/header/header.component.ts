import { Component, Injector, OnInit } from '@angular/core';
import { PageController } from '../../../structure/pages/page.controller';
import { HeaderMenuAPI } from './components/menu/packages/header.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthCanActivate } from '@movit/app/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'layout-comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends PageController implements OnInit {
  readonly profileMenuItems = [
    {
      title: 'Einstellungen',
      path: '/settings/overview',
      cb: ($event: any, item: any) => {
        this.router.navigate([environment.company.url + item.path]);
      },
    },
    {
      title: 'Abmelden',
      cb: () => this.signOff(),
    },
  ];
  constructor(
    override injector: Injector,
    public menuAPI: HeaderMenuAPI,
    private router: Router,
    private http: HttpClient
  ) {
    super(injector);
    console.log('okk');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.onLoadAndSetData(this.menuAPI.getMenu(), this.menuAPI.menu$);
  }

  getMenu() {}

  signOff() {
    this.http.post(environment.auth.url + '/auth/signout', {}).subscribe(() => {
      document.cookie = ''; // todo prevent delete localStorage.uuId
      AuthCanActivate.navigateToAuthPage(document);
    });
  }
}
