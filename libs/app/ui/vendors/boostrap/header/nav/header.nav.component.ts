import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header-nav-ui',
  templateUrl: './header.nav.component.html',
  styleUrls: ['./header.nav.component.scss'],
})
export class HeaderNavUIComponent {
  @Input() bgColor = 'rgb(69, 154, 250)';
  @Input() color = 'white';
}
