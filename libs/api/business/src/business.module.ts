import BusinessDBOptions from './db/business.database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {BusinessIndexHelperRepository, BusinessRepository} from './classes/business.repository';
import { BusinessService } from './business.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BusinessRepository,BusinessIndexHelperRepository])],
  providers: [BusinessService],
  controllers: [],
  exports: [BusinessService],
})
export class BusinessModule {
  static dbSettings = BusinessDBOptions;
}
