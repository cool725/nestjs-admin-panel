import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAvatarProfileUIComponent } from './header.avatar-profile.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@NgModule({
  imports: [CommonModule, MdbDropdownModule],
  declarations: [HeaderAvatarProfileUIComponent],
  exports: [HeaderAvatarProfileUIComponent],
})
export class NavAvatarProfileUIModule {}
