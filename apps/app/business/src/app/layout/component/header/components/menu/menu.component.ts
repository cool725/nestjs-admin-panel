import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

interface MenuItems {
  title: string;
  children: MenuItems[];
  path?: string;
}

@Component({
  selector: 'movit-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class LayoutHeaderMenuComponent implements AfterViewInit {
  @Input() menuItems$: Subject<MenuItems[]>;
  @ViewChild('nav') $nav: { nativeElement: HTMLElement };

  @Input() basePath: string = environment.company.url;

  ngAfterViewInit(): void {
    console.log('init');
  }

  menuItemClick($event: any, item: MenuItems) {
    $event.stopPropagation();
    document.body.click();
  }
}
