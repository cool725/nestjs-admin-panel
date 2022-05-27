import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutAuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {LocaleResolver} from "@movit/app/module";

const BASE = [LayoutAuthComponent];

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    resolve: [LocaleResolver],
    data: {
      path: 'auth',
    },
    loadChildren: () =>
      import('../structure/pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  declarations: [...BASE],
  exports: [],
  providers: [{ provide: 'redirectByRouter', useValue: false }],
})
export class LayoutsModule {}
