import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './me/agenda.component';
import { RouterModule, Routes } from '@angular/router';
import { AgendaFormModule } from './form/agenda-form.module';
import { AgendaListModule } from './list/agenda-list.module';
import { AgendaListComponent } from './list/agenda-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AgendaListComponent, // move to listmodule
  },
  {
    path: '**',
    component: AgendaComponent,
  },
];

@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgendaListModule,
    AgendaFormModule,
  ],
  providers: [],
})
export class AgendaModule {}
