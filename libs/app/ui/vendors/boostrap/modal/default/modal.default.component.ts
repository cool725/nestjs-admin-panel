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

  @Input() modalName = 'default';

  @Input() style: any = {
    width: '925px',
    height: '725px',
    background: 'white',
    left: 'initial',
    top: 'initial',
    right: '0px',
    bottom: '0px',
    display: 'block',
  };

  @Input() dialogClass = 'h-100'; // 'modal-dialog' //todo add description

  @Input() saveModeState = true; // todo add comment

  public fullMode: boolean;

  constructor(private dE: DataEmitter) {}

  public setModalContentFromComponent<C>(
    component: Type<C>,
    options: any = {},
    delay = 0
  ): Promise<ComponentRef<C>> {
    return new Promise((resolver) => {
      this.fullMode = this.modalState;
      setTimeout(() => {
        this.vc.clear();
        const componentRef = this.vc.createComponent(component);
        const instance: any = componentRef.instance;
        instance.id = options.id;
        if (instance.viewSettings && instance.viewSettings.changeMode) {
          instance.viewSettings.mode = this.fullMode ? 'details' : 'simple';
          instance.viewSettings.changeMode = (mode: string) => {
            instance.viewSettings.mode = mode;
            this.setFullMode(mode == 'full' || mode == 'details');
          };
        }
        return resolver(componentRef);
      }, delay);
    });
  }

  protected setFullMode(mode: boolean) {
    this.fullMode = mode;
    this.modalState = mode;
  }

  public set modalState(state: boolean) {
    localStorage.setItem(
      'app.state.modal.' + this.modalName,
      state ? '1' : '0'
    );
  }

  public get modalState() {
    return localStorage.getItem('app.state.modal.' + this.modalName) === '1';
  }
}
