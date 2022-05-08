import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOverviewComponent } from './overview/business-overview.component';
import { RouterModule } from '@angular/router';
import { BusinessAPI } from './business-api.service';
import { MdbSharedModule } from '@movit/app/ui';
import { FormsModule } from '@angular/forms';
import { BusinessFormModule } from './form/business-form.module';

const routes = [
  {
    path: '**',
    component: BusinessOverviewComponent,
  },
];

@NgModule({
  declarations: [BusinessOverviewComponent],
  providers: [BusinessAPI],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BusinessFormModule,
    MdbSharedModule,
    FormsModule,
  ],
})
export class BusinessModule {}
