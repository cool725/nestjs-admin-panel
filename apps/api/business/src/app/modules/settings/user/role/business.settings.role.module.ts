import { Module } from '@nestjs/common';
import { BusinessSettingsRoleController } from './business.settings.role.controller';

@Module({
  imports: [],
  controllers: [BusinessSettingsRoleController],
  providers: [],
})
export class BusinessSettingsRoleModule {}
