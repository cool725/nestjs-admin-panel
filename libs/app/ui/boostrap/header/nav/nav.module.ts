import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavUIComponent } from './header.nav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderNavUIComponent],
  exports: [HeaderNavUIComponent],
})
export class NavUIModule {}
