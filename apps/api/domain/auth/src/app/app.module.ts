import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@movit/api/auth';
import { CompanyModule } from '@movit/api/business';
import { BusinessController } from './business.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AuthModule.dbSettings,
      entities: [
        ...AuthModule.dbSettings.entities,
        ...CompanyModule.dbSettings.entities,
      ],
    }),
    AuthModule,
    CompanyModule,
  ],
  controllers: [AuthController, BusinessController],
  providers: [],
})
export class AppModule {}
