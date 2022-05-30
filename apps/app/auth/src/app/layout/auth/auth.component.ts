import { Component } from '@angular/core';
import { fadein } from '../../structure/routing/router-animations';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'layout-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadein],
})
export class LayoutAuthComponent {
  year = new Date().getFullYear();

  pageName: string;

  constructor(private route: Router) {
    route.events.subscribe((rEvent: any) => {
      if (rEvent instanceof NavigationEnd) {
        this.pageName = <any>rEvent.url.split('/')[1]; //.pop();
      }
    });
  }

  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
