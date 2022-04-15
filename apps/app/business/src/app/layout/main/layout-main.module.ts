import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './layout-main.component';
import { HeaderComponent } from '../component/header/header.component';
import { FooterComponent } from '../component/footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderMenuModule } from '../component/header/components/menu/header.menu.module';
import { NavAvatarProfileUIModule, NavUIModule } from '@movit/app/ui';
import { NavClockUIModule } from '@movit/app/ui';
import { HeaderTopbarModule } from '../../../../../../../libs/app/ui/boostrap/header/topbar/header-topbar.module';

const LayoutComponents = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [LayoutMainComponent, ...LayoutComponents],
  imports: [
    NavClockUIModule,
    NavUIModule,
    CommonModule,
    LayoutRoutingModule,
    HeaderMenuModule,
    NavAvatarProfileUIModule,
    HeaderTopbarModule,
  ],
})
export class LayoutMainModule {}
