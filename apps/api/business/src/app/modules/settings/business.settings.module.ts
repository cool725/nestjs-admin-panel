import { Module } from '@nestjs/common';
import { BusinessSettingsRoleModule } from './user/role/business.settings.role.module';
import { BusinessSettingsUserModule } from './user/user/business.settings.user.module';

@Module({
  imports: [BusinessSettingsRoleModule, BusinessSettingsUserModule],
  controllers: [],
  providers: [],
})
export class BusinessSettingsModule {}
