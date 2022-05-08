import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesComponent } from './locales.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LocalesComponent,
  },
  {
    path: '**',
    component: LocalesComponent,
  },
];
@NgModule({
  declarations: [LocalesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsLocalesModule {}
