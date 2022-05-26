import BusinessDBOptions from './db/company.database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './classes/company.repository';
import { CompanyService } from './company.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  providers: [CompanyService],
  controllers: [],
  exports: [CompanyService],
})
export class CompanyModule {
  static dbSettings = BusinessDBOptions;
}
