import {Component, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {DataEmitter} from "@movit/app/common";

@Component({
  selector: 'lib-modal-ui',
  templateUrl: './modal.default.component.html',
  styleUrls: ['./modal.default.component.scss'],
})
export class BoostrapModalUIComponent {

  @ViewChild('vc' , { read: ViewContainerRef }) vc: ViewContainerRef;

  constructor(private dE: DataEmitter) {}

  setModalContentFromComponent(component:any,delay = 0){
    this.vc.clear();
    setTimeout(()=>this.vc.createComponent(component),delay)
  }
}
