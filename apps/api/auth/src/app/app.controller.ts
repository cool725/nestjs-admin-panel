import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AuthLogin,
  AuthService,
  AuthUser,
  AuthUserCredentialsDto,
  GetUser,
} from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { BusinessService } from '@movit/api/business';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private businessAPI: BusinessService
  ) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthUserCredentialsDto
  ): Promise<{ userId: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthUserCredentialsDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto).then(async (result) => {
      if (result && result.accessToken) {
        /* Verify if user has companyRole */
        const user: any = {
          userId: result.user.id,
          authCreatedAt: result.user.authCreatedAt,
        };

        const list = await this.businessAPI.list(user, {});

        if (list[0]) {
          (<any>result).accessCompanyToken = (
            await this.getCompanyJWT(user, list[0].businessUuId)
          ).accessToken;
        }

        AuthController.handleSuccess(res, {
          ...result,
          uuId: authCredentialsDto.uuId,
        });
      }
      return result;
    });
  }

  @Post('/signout')
  @UseGuards(AuthGuard())
  signOut(
    @GetUser() user: { session: AuthLogin },
    @Res({ passthrough: true }) res: Response
  ) {
    if (user && user.session) {
      this.authService.signOut(user.session.id, user.session.uuId);
      res.cookie('utk', '', {
        httpOnly: false,
        expires: new Date(),
        path: '/',
      });
      res.cookie('ctk', '', {
        httpOnly: false,
        expires: new Date(),
        path: '/',
      });
      return 1;
    }
  }

  @Post('/session')
  @UseGuards(AuthGuard())
  session(@GetUser() user: AuthLogin): any {
    return { valid: 1 };
  }

  @Post('/pass-forgot')
  passForgot(@Body() authCredentialsDto: AuthUserCredentialsDto): any {
    return this.authService.sendResetPasswordToken(authCredentialsDto);
  }

  @Post('/pass-verify-code')
  passVerifyCode(@Body() body: { email: string; code: string }): any {
    return this.authService.verifyPasswordResetLink(body.email, body.code);
  }

  @Post('/pass-update')
  updatePassword(
    @Body() body: { email: string; code: string; password: string }
  ): any {
    return this.authService
      .verifyPasswordResetLink(body.email, body.code)
      .then((user) =>
        user
          ? this.authService.resetPasswordByEmail(
              body.email,
              body.password,
              user
            )
          : {}
      );
  }

  @Post('/pass-reset')
  @UseGuards(AuthGuard())
  passReset(): any {
    return 1;
  }

  @Post('/verify-mail')
  @UseGuards(AuthGuard())
  verifyMail(): any {
    return 1;
  }

  @Post('signin-company/:businessId')
  @UseGuards(AuthGuard())
  async signInCompany(
    @GetUser() authUser: AuthUser,
    @Res({ passthrough: true }) res: Response,
    @Param('businessId') businessId: string
  ) {
    // id = companyUuId
    if (!businessId) {
      throw new UnauthorizedException('businessId Missing');
    }

    const token = (await this.getCompanyJWT(authUser, businessId))?.accessToken;

    AuthController.handleSuccess(res, {
      accessCompanyToken: token,
    });

    return { accessToken: token };
  }

  async getCompanyJWT(
    authLogin: { userId: string; authCreatedAt: number },
    companyUuId: string
  ) {
    /* Verify if user has companyRole */
    const company = await this.businessAPI.findUserBusinessRole(
      authLogin,
      companyUuId
    );

    if (!company) throw new UnauthorizedException('Id not valid');

    /* Create token */
    const accessToken = this.authService.createJWTToken({
      companyId: company.businessId,
      userId: authLogin['userId'],
      authCreatedAt: authLogin['authCreatedAt'],
    });

    return { accessToken: accessToken };
  }

  // todo rename:
  static handleSuccess(res: Response, options: any = {}) {
    // User access token
    const cookieOptions =
      process.env.APP_ENV === 'development'
        ? {
            domain: '.movit.local',
            secure: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * (24 * 365)),
          }
        : {
            domain: '.movit.ch',
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * (24 * 365)),
          };

    if (options.accessToken) {
      res
        .cookie('utk', options.accessToken, {
          httpOnly: false,
          ...cookieOptions,
          path: '/',
        })
        .cookie('uuId', options.uuId, {
          httpOnly: false,
          ...cookieOptions,
          secure: false,
          path: '/',
        });
    }

    // Company access token
    if (options.accessCompanyToken) {
      res.cookie('ctk', options.accessCompanyToken, {
        httpOnly: true,
        secure: true,
        ...cookieOptions,
        // path: '/[TENTAND]',
      });
    }
  }

  static handleOnError(res: Response, options: any = {}) {
    //
    //res.clearCookies()
  }
}
