import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FinanceAccountingComponent} from "./accounts/finances-accounts.component";
import {TranslateLocaleModule} from "@movit/app/module";

const routes = [
  {
    path: 'accounts/overview',
    component: FinanceAccountingComponent,
  }
];

@NgModule({
  declarations: [
    FinanceAccountingComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateLocaleModule],
  providers: [],
})
export class FinanceSettingsModule {}
