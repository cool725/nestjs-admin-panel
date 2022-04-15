import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderClockUIComponent } from './header.clock.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderClockUIComponent],
  exports: [HeaderClockUIComponent],
})
export class NavClockUIModule {}
