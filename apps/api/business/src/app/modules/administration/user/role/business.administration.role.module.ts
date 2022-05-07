import { Module } from '@nestjs/common';
import { BusinessAdministrationRoleController } from './business.administration.role.controller';

@Module({
  imports: [],
  controllers: [BusinessAdministrationRoleController],
  providers: [],
})
export class BusinessAdministrationRoleModule {}
