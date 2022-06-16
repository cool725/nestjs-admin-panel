import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentDBOptions from './db/payment.database';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AccountModule {
  static dbSettings = PaymentDBOptions;
}
