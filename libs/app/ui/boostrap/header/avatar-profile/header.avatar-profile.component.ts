import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header-avatar-ui',
  templateUrl: './header.avatar-profile.component.html',
  styleUrls: ['./header.avatar-profile.component.scss'],
})
export class HeaderAvatarProfileUIComponent {
  @Input() label: string | undefined = '';
  @Input() menuItems: any[] = [];
}
