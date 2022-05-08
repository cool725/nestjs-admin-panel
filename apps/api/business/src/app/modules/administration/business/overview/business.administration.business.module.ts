import { Module } from '@nestjs/common';
import { BusinessAdministrationBusinessController } from './business.administration.business.controller';

@Module({
  imports: [],
  controllers: [BusinessAdministrationBusinessController],
  providers: [],
})
export class BusinessAdministrationBusinessModule {}
