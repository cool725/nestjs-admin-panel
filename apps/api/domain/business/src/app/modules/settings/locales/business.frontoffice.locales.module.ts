import { Module } from '@nestjs/common';
import { BusinessSettingsLocalesController } from './business.frontoffice.locales.controller';
import { TranslationModule } from '@movit/api/translation';

@Module({
  imports: [TranslationModule],
  controllers: [BusinessSettingsLocalesController],
  providers: [],
})
export class BusinessSettingsLocalesModule {}
