import {
  Component,
  ComponentRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { DataEmitter } from '@movit/app/common';

@Component({
  selector: 'lib-modal-ui',
  templateUrl: './modal.default.component.html',
  styleUrls: ['./modal.default.component.scss'],
})
export class BoostrapModalUIComponent {
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  @Input() style = {
    width: '925px',
    height: '725px',
    background: 'red',
    left: 'initial',
    top: 'initial',
    right: '0px',
    bottom: '0px',
  };

  @Input() dialogClass = 'h-100'; // 'modal-dialog'

  constructor(private dE: DataEmitter) {}

  setModalContentFromComponent<C>(
    component: Type<C>,
    options:any = {},
    delay = 0
  ): Promise<ComponentRef<C>> {
    return new Promise((resolver) =>
      setTimeout(() => {
        this.vc.clear();
        const componentRef = this.vc.createComponent(component);
        (<any>componentRef.instance)['id'] = options.id;
        resolver(componentRef);
      }, delay)
    );
  }
}
