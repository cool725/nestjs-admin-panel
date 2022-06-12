import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderMenuComponent } from './menu.component';

import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderMenuAPI } from "./header.service";
import {TranslateLocaleModule} from "@movit/app/module";

const components = [LayoutHeaderMenuComponent];

@NgModule({
  declarations: [components],
    imports: [CommonModule, RouterModule, NzMenuModule, TranslateLocaleModule],
  exports: [components],
  providers: [HeaderMenuAPI],
})
export class HeaderMenuModule {}
