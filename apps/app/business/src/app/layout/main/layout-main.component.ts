import {Component, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {fadein} from './router-animations';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {BoostrapModalUIComponent} from '@movit/app/ui';
import {DataEmitter, EDataEmitterType} from "@movit/app/common";
import {ProfilesFormComponent} from "../../structure/pages/frontoffice/crm/profiles/form/profiles-form.component";

@Component({
  selector: 'start-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  animations: [fadein],
})
export class LayoutMainComponent {
  @ViewChild('vcModal', { read: ViewContainerRef }) vcModal: ViewContainerRef;

  constructor(private route: ActivatedRoute,private dE:DataEmitter) {
    this.setRouteParams()
    this.init()
  }

  private init(){
    this.dE.register(EDataEmitterType.ModalOpen, data => {
      this.openModal<ProfilesFormComponent>(data)
    })
  }

  private setRouteParams(){
    const businessUuid = this.route.snapshot.paramMap.get('businessUuid') || localStorage.getItem('ctk');
    const locationId = this.route.snapshot.paramMap.get('locationId') || '1';
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

  public async openModal<C>(component: Type<C>, options = {}) {
    const modalRef = this.vcModal.createComponent<BoostrapModalUIComponent>(
      BoostrapModalUIComponent
    );
     const componentRef = await modalRef.instance.setModalContentFromComponent(component, options,300);
    (<any>componentRef.instance)['closeModal'] = ()=> modalRef.destroy(); // todo find better solution | with data emitter

    return componentRef
  }
}
