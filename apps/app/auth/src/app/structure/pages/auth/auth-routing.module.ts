import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// System Auth pages
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot-password/forgot.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { MenuComponent } from './menu/menu.component';
import { Error404Component } from './404/404.component';
import { Error500Component } from './500/500.component';


const filterEmpty = (arry:any[]) => arry.filter(x => x)

const routes: Routes = [
  ... [].concat(... [].concat(
    ['', /*auth*/].map(path => {
      return [
        {
          path: filterEmpty([path,'login-business']).join('/'),
          component: LoginComponent,
          data: { title: 'Login' },
        },
        {
          path: filterEmpty([path,'forgot']).join('/'),
          component: ForgotComponent,
          data: { title: 'Forgot Password' },
        },
        {
          path:  filterEmpty([path,'reset/:mail/:code']).join('/'),
          component: ForgotComponent,
          data: { title: 'Restore Password' },
        },
        {
          path: filterEmpty([path,'confirm-mail/:mail/:key']).join('/'),
          component: ConfirmEmailComponent,
          data: { title: 'confirm-mail' },
        },
        {
          path:   filterEmpty([path,'signup/:invitation']).join('/'),
          component: RegisterComponent,
          data: { title: 'Register' },
        },
        { path: filterEmpty([path,'signup']).join('/'), component: RegisterComponent, data: { title: 'Register' } },
        {
          path: '404',
          component: Error404Component,
          data: { title: '404' },
        },
        {
          path: '500',
          component: Error500Component,
          data: { title: '500' },
        },
      ]
    }))),
  { path: 'auth/login', redirectTo: 'login-business' },
  { path: 'auth/forgot', redirectTo: 'forgot' },
  { path: 'auth/reset', redirectTo: 'reset' },

  { path: '', component: MenuComponent, data: { title: 'Menu' } },
  { path: '**', component: MenuComponent, data: { title: 'Menu' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AuthRouterModule {}
