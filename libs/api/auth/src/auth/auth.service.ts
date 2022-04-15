import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { IAuthJtwPayload } from './jtw/auth.jtw.interface';
import { ConfigService } from '@nestjs/config';

import { AuthUserCredentialsDto } from './classes/auth.dto.user.credentials';
import { AuthRepositoryUser } from './classes/auth.repository.user';
import { AuthUser } from './entities/auth.entity.user';
import { Mailer } from '../../../common/classes/lib/mail/Mail.Send.Class';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepositoryUser)
    private authUserRepo: AuthRepositoryUser,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public getUserByUserId(userId: string) {
    return this.authUserRepo.findOne({
      where: {
        userId: userId,
      },
    });
  }

  public signUp(user: Partial<AuthUser>): Promise<{ userId: string }> {
    return this.authUserRepo.signUp(user);
  }

  public async signIn(credentials: AuthUserCredentialsDto): Promise<{
    accessToken: string;
    user: { id: string; authCreatedAt: number };
  }> {
    const user = await this.authUserRepo.validateUserPassword(credentials);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!credentials.uuId) throw new UnauthorizedException('uuId missing');

    const id = await this.authUserRepo.registerUuId(
      credentials.uuId,
      user,
      true
    );

    const accessToken = this.jwtService.sign(
      <IAuthJtwPayload>{
        id: id || '',
        sub: user.userId,
        authCreatedAt: user.authCreatedAt,
        uuId: credentials.uuId,
        scopes: [''],
      },
      {
        expiresIn: '200d',
        secret: this.configService.get<string>('APP_SECRET'),
      }
    );

    return {
      accessToken,
      user: { id: user.userId, authCreatedAt: user.authCreatedAt },
    };
  }

  public async signOut(
    loginId: any,
    uuId: string
  ): Promise<{ success: boolean }> {
    this.authUserRepo.unRegisterUuIdById(uuId, loginId); // delete by
    return { success: true };
  }

  public async sendResetPasswordToken(
    credentials: AuthUserCredentialsDto
  ): Promise<number> {
    if (!AuthService.validateEmail(credentials.email)) return -1;

    const user = await this.authUserRepo.findAuthUserByEmail(credentials.email);
    if (!user) return 1;

    // create reset Link
    user.passwordResetLink = AuthService.makeId(99, true);
    user.save();

    setTimeout(() => {
      user.passwordResetLink = null;
      user.save();
    }, 1800000); // 30Minutes

    this.sendEmailPasswordResetLink(
      user.passwordResetLink,
      user.email,
      credentials.domain
    );

    return 1;
  }

  private sendEmailPasswordResetLink(
    resetToken: string,
    email: string,
    domain: string | undefined = undefined
  ) {
    const baseUrl = domain || process.env.RESET_URL_BASE || process.env.APP_URL;
    const html = Mailer.Mail.loadTemplate('reset-password.html');
    return new Mailer.Mail()
      .sendEmail(
        email,
        'Passwort zurücksetzen',
        html.replace('[LINK]', baseUrl + `/reset/` + email + '/' + resetToken)
      )
      .catch((error) => console.warn(error));
  }

  public async verifyPasswordResetLink(
    email: string,
    code: string
  ): Promise<AuthUser | null> {
    const user = await this.authUserRepo.findAuthUserByEmail(email);
    if (user && user.passwordResetLink === code) return user;
    return null;
  }

  public async resetPasswordByEmail(
    email: string,
    password: string,
    authUser: AuthUser | undefined = undefined
  ) {
    return this.authUserRepo.resetPasswordByEmail(email, password, authUser);
  }

  static makeId(length: number, simple = false) {
    let result = '';
    const characters = simple
      ? 'abcdefghijklw123445_6789'
      : '+ABC4!DEFGHIJKL+MNOPQRSTUVW$XYZabcde@fghijklmnopqrstuvwxyz0123456789+C';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static validateEmail(email: string): boolean {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  createJWTToken(params: any) {
    return this.jwtService.sign(params, {
      expiresIn: '200d',
      secret: this.configService.get<string>('APP_SECRET'),
    });
  }

  verifyJWTToken(token: string) {
    return this.jwtService.decode(token);
  }
}
