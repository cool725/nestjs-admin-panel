import { Module } from '@nestjs/common';
import { BusinessAdministrationRoleModule } from './user/role/business.administration.role.module';
import { BusinessAdministrationUserModule } from './user/user/business.administration.user.module';
import { BusinessAdministrationBusinessModule } from './business/overview/business.administration.business.module';

@Module({
  imports: [
    BusinessAdministrationRoleModule,
    BusinessAdministrationUserModule,
    BusinessAdministrationBusinessModule,
  ],
  controllers: [],
  providers: [],
})
export class BusinessAdministrationModule {}
