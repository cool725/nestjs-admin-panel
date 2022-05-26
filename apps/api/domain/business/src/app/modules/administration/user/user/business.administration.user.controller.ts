import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Administration } from '../../business.administration.namespace';
import { GetCompany } from '../../../../../../../../../../libs/api/models/company/src/company.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from '@movit/api/business';
import { CompanyEntity } from '../../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
import { AuthService, CompanyGuard } from '@movit/api/auth';

@Controller(Administration.resolePath(Administration.User.UserPATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationUserController {
  constructor(
    private businessService: CompanyService,
    private authService: AuthService
  ) {}

  @Get('getUsers')
  getUsers(@GetCompany() business: CompanyEntity) {
    return this.businessService.getBusinessUsers(business);
  }

  @Get('getUser/:userId')
  getUser(
    @GetCompany() business: CompanyEntity,
    @Param('userId') userId: string
  ) {
    return this.businessService.getBusinessUser(business, userId);
  }

  @Post('createUser')
  createUser(@GetCompany() business: CompanyEntity, @Body() userData: any) {
    userData.password = userData.password || '*****';
    return this.authService.signUp(userData).then(async ({ userId }) => {
      return this.businessService.addUserToBusinessRole(
        business,
        await this.authService
          .getUserByUserId(userId)
          .then((user) => user.initialise(userData).save())
      );
    });
  }

  @Patch('updateUser/:userId')
  updateUser(
    @GetCompany() business: CompanyEntity,
    @Param('userId') userId: string,
    @Body() userData: any
  ) {
    return this.businessService.updateBusinessUser(business, userData);
  }

  @Delete('deleteUser/:userId')
  deleteUser(
    @GetCompany() business: CompanyEntity,
    @Param('userId') userId: string,
    @Body() userData: any
  ) {
    return this.businessService.deleteBusinessUser(business, userId);
  }
}
