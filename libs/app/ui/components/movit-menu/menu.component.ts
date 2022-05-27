import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {MenuEnv, MenuItem} from "./menu.interface";



@Component({
  selector: 'movit-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class LayoutHeaderMenuComponent {
  @Input() menuItems$: Subject<MenuItem[]>;
  @ViewChild('nav') $nav: { nativeElement: HTMLElement };

  @Input() basePath: string = this.environment.company.url;

  constructor(@Inject('env') private environment: MenuEnv) {}
}
