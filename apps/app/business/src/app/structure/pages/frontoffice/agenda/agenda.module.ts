import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './me/agenda.component';
import { RouterModule, Routes } from '@angular/router';
import { AgendaAPI } from './me/agenda.api.service';
import { environment } from '../../../../../environments/environment';
import { AgendaFormComponent } from './form/agenda-form.component';
import {AgendaFormModule} from "./form/agenda-form.module";

const routes: Routes = [
  {
    path: '**',
    component: AgendaComponent,
  },
];

@NgModule({
  declarations: [AgendaComponent,],
  imports: [CommonModule, RouterModule.forChild(routes), AgendaFormModule],
  providers: [
    {
      provide: 'apiPath',
      useValue: environment.api.url + '/frontoffice',
    },
    AgendaAPI,
  ],
})
export class AgendaModule {}
