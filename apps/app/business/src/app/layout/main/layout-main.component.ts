import { Component } from '@angular/core';
import { fadein } from './router-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

function getCookie(cName: string) {
  const name = cName + '=';
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

@Component({
  selector: 'start-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  animations: [fadein],
})
export class LayoutMainComponent {
  constructor(route: ActivatedRoute, private router: Router) {
    const businessUuid =
      route.snapshot.paramMap.get('businessUuid') ||
      localStorage.getItem('ctk');
    const locationId = route.snapshot.paramMap.get('locationId') || '1';

    if (!businessUuid || !locationId) {
      console.warn('ID is missing');
      this.redirectToAuth();
    } else {
      environment.company.url = `/${businessUuid}/${locationId}`;
      localStorage.setItem('ctk', businessUuid);
      localStorage.setItem('path:2', locationId);
      sessionStorage.setItem('ctk', businessUuid);
      sessionStorage.setItem('path:2', locationId);
    }
  }

  private saveLocalSession() {}

  private urlParamsIsValid() {}

  private redirectToAuth() {
    return;
    document.location = `${location.protocol}//auth.${(() => {
      const url = location.host.split('.');
      url.shift();
      return url.join('.');
    })()}`;
  }

  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
