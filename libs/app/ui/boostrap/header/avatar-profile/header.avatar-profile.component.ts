import { Component, Input } from '@angular/core';

interface IProfile {
  avatar: string;
}

@Component({
  selector: 'lib-header-avatar-ui',
  templateUrl: './header.avatar-profile.component.html',
  styleUrls: ['./header.avatar-profile.component.scss'],
})
export class HeaderAvatarProfileUIComponent {
  @Input() menuItems: any[] = [];
}
