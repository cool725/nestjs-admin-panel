import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthRepositoryUser } from '../classes/auth.repository.user';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthJtwPayload } from './auth.jtw.interface';
import { AuthUser } from '../entities/auth.entity.user';
import { ConfigService } from '@nestjs/config';

// @ts-ignore
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthJtwStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepositoryUser)
    private authUserRepo: AuthRepositoryUser,
    private configService: ConfigService
  ) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('APP_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * @param req
   * @param payload:IAuthJtwPayload
   * Decoded Bearer token
   * */
  async validate(
    req: Request,
    payload: IAuthJtwPayload
  ): Promise<AuthUser | undefined> {
    if (this.authUserRepo.saveUuIdToken) {
      // handle User Session
      const session = await this.authUserRepo.findUuIdByPayload(payload);

      if (!session) throw new UnauthorizedException();

      if (session.user) this.injectData(session);

      return session && session.user ? session.user : undefined;
    } else {
      const user = await this.authUserRepo.findOne({
        authCreatedAt: payload.authCreatedAt,
        userId: payload.sub,
      });
      return user ? user : undefined;
    }
  }

  /**
   * Stores data for the Frontend
   * */
  private injectData(session: any) {
    session.user['session'] = {
      id: session.id,
      uuId: session.uuId,
      cId: session.companyId,
    };
  }
}
