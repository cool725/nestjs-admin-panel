import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderMenuComponent } from './menu.component';

import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderMenuAPI } from "./header.service";

const components = [LayoutHeaderMenuComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule, NzMenuModule],
  exports: [components],
  providers: [HeaderMenuAPI],
})
export class HeaderMenuModule {}
