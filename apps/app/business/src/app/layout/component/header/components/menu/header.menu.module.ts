import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemDirectiveDirective } from './packages/menu.item.directive.directive';
import { LayoutHeaderMenuComponent } from './menu.component';
import { HeaderMenuAPI } from './packages/header.service';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const components = [LayoutHeaderMenuComponent, MenuItemDirectiveDirective];

@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule, NzMenuModule],
  exports: [components],
  providers: [HeaderMenuAPI],
})
export class HeaderMenuModule {}
