import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOverviewComponent } from './overview/business-overview.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '**',
    component: BusinessOverviewComponent,
  },
];

@NgModule({
  declarations: [BusinessOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BusinessModule {}
