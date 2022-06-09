import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashSystemDeviceRepository } from './classes/cashsystem.repository.device';
import { CashSystemDeviceService } from "./cashsystem.service";
import DBEmployeeOptions from "./db/cashsystem.database";

@Module({
  imports: [
    TypeOrmModule.forFeature([CashSystemDeviceRepository]),
  ],
  providers: [ CashSystemDeviceService],
  exports: [ CashSystemDeviceService ],
})
export class CashSystemModule {
  static dbSettings = DBEmployeeOptions;
}
