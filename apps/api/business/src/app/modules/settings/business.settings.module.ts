import { Module } from '@nestjs/common';
import { BusinessSettingsController } from './business.settings.controller';
import { BusinessSettingsLocalesModule } from './locales/business.frontoffice.locales.module';

@Module({
  imports: [BusinessSettingsLocalesModule],
  controllers: [BusinessSettingsController],
  providers: [],
})
export class BusinessSettingsModule {}
