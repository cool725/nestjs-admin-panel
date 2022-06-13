import AccountDBOptions from './db/account.database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import {
  AccountCategoryRepository,
  AccountRepository,
  AccountTaxRepository,
} from './classes/account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      AccountCategoryRepository,
      AccountTaxRepository,
    ]),
  ],
  providers: [AccountService],
  controllers: [],
  exports: [AccountService],
})
export class AccountModule {
  static dbSettings = AccountDBOptions;
}
