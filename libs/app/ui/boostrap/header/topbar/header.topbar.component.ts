import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  DataEmitter,
  EDataEmitterType,
} from "@movit/app/common";

@Component({
  selector: 'ui-topbar',
  templateUrl: './header.topbar.component.html',
  styleUrls: ['./header.topbar.component.scss'],
})
export class HeaderTopbarUIComponent {
  @ViewChild('container', { read: TemplateRef }) $container: TemplateRef<any>;

  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  @Input() bgColor = '';

  @Input() color = '';

  constructor(private dE: DataEmitter, private vref: ViewContainerRef) {
    dE.register(EDataEmitterType.TopBarTemplate, (data) => {
      this.vc.clear();
      this.vc.insert(data);
    });
  }
}
