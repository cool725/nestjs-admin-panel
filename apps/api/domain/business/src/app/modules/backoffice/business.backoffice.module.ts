import { Module } from '@nestjs/common';
import { BusinessBackOfficeController } from './business.backoffice.controller';
import { BusinessBackofficeSalesItemsModule } from './sales/items/business.backoffice.sales.items.module';
import {BusinessBackofficeEmployeesModule} from "./employees/items/business.backoffice.employees.module";

@Module({
  imports: [
    BusinessBackofficeSalesItemsModule,
    BusinessBackofficeEmployeesModule],
  controllers: [BusinessBackOfficeController],
  providers: [],
})
export class BusinessBackOfficeModule {}
