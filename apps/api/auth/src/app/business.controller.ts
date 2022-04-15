import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthLogin, AuthService, GetUser } from '@movit/api/auth';
import { BusinessService } from '@movit/api/business';
import { Response, Request } from 'express';

@Controller('business')
@UseGuards(AuthGuard())
export class BusinessController {
  constructor(
    private businessAPI: BusinessService,
    private authService: AuthService
  ) {}

  @Get('list')
  async list(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: { session: AuthLogin },
    @Query() body: any
  ) {
    const { autoLogin } = body;
    const list = await this.businessAPI.list(user, body);

    if (autoLogin && list.length === 1) {
      return {
        uuid: list[0].businessUuId,
        ...(await this.signIn(req, res, user, { id: list[0].businessUuId })),
        redirect: 'business',
      };
    }

    return list.map((v) => v.toSimpleJson());
  }

  @Post('signIn')
  async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @GetUser() authLogin: { session: AuthLogin },
    @Body() body: any
  ) {
    // id = companyUuId
    const { id } = body;

    if (!id) {
      throw new UnauthorizedException('Id Missing');
    }

    /* Verify if user has companyRole */
    const company = await this.businessAPI.findUserBusinessRole(authLogin, id);

    if (!company) throw new UnauthorizedException('Id not valid');

    /* Create token */
    const accessToken = BusinessController.handleSignInSuccess(
      res,
      this.authService.createJWTToken({
        companyId: company.businessId,
        userId: authLogin['userId'],
        authCreatedAt: authLogin['authCreatedAt'],
      })
    );

    return { accessToken: accessToken };
  }

  static handleSignInSuccess(res, token: string) {
    const cookieOptions =
      process.env.APP_ENV === 'development'
        ? {
            domain: '.movit.local',
            secure: false,
          }
        : {
            domain: '.movit.ch',
            secure: true,
          };

    res.cookie('ctk', token, {
      httpOnly: true,
      ...cookieOptions,
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * (24 * 365)),
    });
    return token;
  }
}
