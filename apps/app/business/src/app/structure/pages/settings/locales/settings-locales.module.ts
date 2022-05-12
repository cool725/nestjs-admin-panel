import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesComponent } from './locales.component';
import { RouterModule, Routes } from '@angular/router';
import { LocalesService } from './locales-service';
import { KeysPipe } from './pipes.key';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {FormsModule} from "@angular/forms";

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
  imports: [CommonModule, RouterModule.forChild(routes), NzSelectModule, FormsModule], // todo NzSelectModule to sharedModules
  providers: [LocalesService],
})
export class SettingsLocalesModule {}
