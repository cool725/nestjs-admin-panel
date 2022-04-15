import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoostrapModalUIComponent } from './modal.default.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BoostrapModalUIComponent],
  exports: [BoostrapModalUIComponent],
})
export class BoostrapModalUIModule {}
