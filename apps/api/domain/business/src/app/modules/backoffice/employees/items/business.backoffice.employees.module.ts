import { Module } from '@nestjs/common';
import { BusinessBackofficeEmployeesController } from './business.backoffice.employees.controller';

@Module({
  imports: [],
  controllers: [
    BusinessBackofficeEmployeesController,
  ],
  providers: [],
})
export class BusinessBackofficeEmployeesModule {}
