import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import { fadein } from './router-animations';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BoostrapModalUIComponent } from "@movit/app/ui";


@Component({
  selector: 'start-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  animations: [ fadein ],
})
export class LayoutMainComponent {

  @ViewChild('vcModal', { read: ViewContainerRef }) vcModal: ViewContainerRef;

  constructor(private route: ActivatedRoute) {
    const businessUuid = route.snapshot.paramMap.get('businessUuid') || localStorage.getItem('ctk');
    const locationId = route.snapshot.paramMap.get('locationId') || '1';
    if (!businessUuid || !locationId) {
      console.warn('ID is missing');
      this.redirectToAuth();
    }
    else {
      environment.company.url = `/${businessUuid}/${locationId}`;
      localStorage.setItem('ctk', businessUuid);
      localStorage.setItem('path:2', locationId);
      sessionStorage.setItem('ctk', businessUuid);
      sessionStorage.setItem('path:2', locationId);
    }
  }

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

  public openModal(component:any){
   const componentRef = this.vcModal.createComponent<BoostrapModalUIComponent>(BoostrapModalUIComponent);
   componentRef.instance.setModalContentFromComponent(component,300);
  }
}
