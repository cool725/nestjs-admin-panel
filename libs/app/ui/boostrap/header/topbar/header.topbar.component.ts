import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

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

  constructor(private vref: ViewContainerRef) {
    (<any>window)['emitTemplate'] = (templte: any) => {
      this.vc.clear();
      this.vc.insert(templte);
    };
  }
}
