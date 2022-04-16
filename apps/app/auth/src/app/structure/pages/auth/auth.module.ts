import { NgModule } from '@angular/core';

import { AuthRouterModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pages
import { LoginComponent } from './login/login.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { Error500Component } from './500/500.component';
import { Error404Component } from './404/404.component';
import { ForgotComponent } from './forgot-password/forgot.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { MenuComponent } from './menu/menu.component';
import {TranslateModule} from "@ngx-translate/core";

const COMPONENTS = [
  LoginComponent,
  LockscreenComponent,
  Error500Component,
  Error404Component,
  ForgotComponent,
  RegisterComponent,
  ConfirmEmailComponent,
  MenuComponent,
];

@NgModule({
  imports: [
    AuthRouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  declarations: [...COMPONENTS],
  providers: [
    // todo move higher
    {
      provide: 'uuId',
      useValue: window.getDeviceId(),
    },
  ],
})
export class AuthModule {}
