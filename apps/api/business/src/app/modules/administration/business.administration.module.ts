import { Module } from '@nestjs/common';
import { BusinessAdministrationRoleModule } from './user/role/business.administration.role.module';
import { BusinessAdministrationUserModule } from './user/user/business.administration.user.module';

@Module({
  imports: [BusinessAdministrationRoleModule, BusinessAdministrationUserModule],
  controllers: [],
  providers: [],
})
export class BusinessAdministrationModule {}
