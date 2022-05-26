import { Controller, Get, UseGuards } from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { ReservationService } from '@movit/api/reservation';
import { GetCompany } from '../../../../../../../../libs/api/models/company/src/company.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/models/company/src/entities/business.entity';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { ProfilesService } from '@movit/api/profiles';
import { GetPagination } from '../../../../../../../../libs/api/common/decorator';

@Controller(FrontOffice.resolePaths([FrontOffice.Agenda.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeAgendaProfilesController {
  constructor(
    protected reservationService: ReservationService,
    protected profilesService: ProfilesService
  ) {}

  /*
   * Gets reservations with legs
   * */
  @Get('profiles')
  getProfiles(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: any
  ) {
    return this.profilesService.getProfiles(business.companyId, pagination);
  }
}
