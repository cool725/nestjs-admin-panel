import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJtwStrategy } from './jtw/auth.jtw.strategy';
import { AuthRepositoryUser } from './classes/auth.repository.user';
import DBAuthOptions from './db/auth.database';
import { AuthRepositoryTemplate } from './classes/auth.repository.template';

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: 0,
      },
    }),
    TypeOrmModule.forFeature([AuthRepositoryUser, AuthRepositoryTemplate]),
  ],
  providers: [AuthService, AuthJtwStrategy],
  exports: [AuthJtwStrategy, PassportModule, AuthService],
})
export class AuthModule {
  static dbSettings = DBAuthOptions;
}
