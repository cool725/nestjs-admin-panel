import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTopbarUIComponent } from './header.topbar.component';

@NgModule({
  declarations: [HeaderTopbarUIComponent],
  imports: [CommonModule],
  exports: [HeaderTopbarUIComponent],
})
export class HeaderTopbarModule {}
