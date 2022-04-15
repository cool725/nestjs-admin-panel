import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalAccountingTTablesComponent } from './t-tables/external-accounting-t-tables.component';
import { RouterModule } from '@angular/router';
import { ExternalAccountingTransactionListComponent } from './transaction-list/transaction-list.component';
import { FinanceAPI } from './external-accounting.service';
import { ExternalAccountingCashFlowComponent } from './cashflow/cashflow.component';

const routes = [
  {
    path: '1',
    component: ExternalAccountingTTablesComponent,
  },
  {
    path: 'cashflow',
    component: ExternalAccountingCashFlowComponent,
  },
  {
    path: '',
    component: ExternalAccountingTransactionListComponent,
  },
];

@NgModule({
  declarations: [
    ExternalAccountingTTablesComponent,
    ExternalAccountingTransactionListComponent,
    ExternalAccountingCashFlowComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [FinanceAPI],
})
export class FinancesExternalAccountingModule {}
