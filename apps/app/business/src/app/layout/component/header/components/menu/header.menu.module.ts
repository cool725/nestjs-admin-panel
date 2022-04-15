import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemDirectiveDirective } from './packages/menu.item.directive.directive';
import { LayoutHeaderMenuComponent } from './menu.component';
import { HeaderMenuAPI } from './packages/header.service';
import { RouterModule } from '@angular/router';

const components = [LayoutHeaderMenuComponent, MenuItemDirectiveDirective];

@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule],
  exports: [components],
  providers: [HeaderMenuAPI],
})
export class HeaderMenuModule {}
