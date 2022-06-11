import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAntSharedModule } from '@movit/app/ui';
import { LocalesComponent } from './locales.component';
import { RouterModule, Routes } from '@angular/router';
import { LocalesService } from './locales-service';
import { KeysPipe } from './pipes.key';
import { FormsModule } from '@angular/forms';
import { BoostrapModalUIModule } from '../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module';

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
  declarations: [LocalesComponent, KeysPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzAntSharedModule,
    FormsModule,
    BoostrapModalUIModule,
  ],
  providers: [LocalesService],
})
export class SettingsLocalesModule {}
