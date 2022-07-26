import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingUserAPI } from '../administration/user/packages/user-api.service';

const routes: Routes = [
  {
    path: 'locales',
    loadChildren: () =>
      import('./locales/settings-locales.module').then(
        (m) => m.SettingsLocalesModule
      ),
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [SettingUserAPI],
})
export class SettingsModule {}
