import { Module } from '@nestjs/common';
import { BusinessSettingsController } from './business.settings.controller';

@Module({
  imports: [],
  controllers: [BusinessSettingsController],
  providers: [],
})
export class BusinessSettingsModule {}
