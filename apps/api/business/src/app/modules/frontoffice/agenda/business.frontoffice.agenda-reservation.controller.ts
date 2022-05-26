import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { ReservationService } from '@movit/api/reservation';
import { GetCompany } from '../../../../../../../../libs/api/models/company/src/company.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/models/company/src/entities/business.entity';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';

@Controller(FrontOffice.resolePaths([FrontOffice.Agenda.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeAgendaController {
  constructor(protected reservationService: ReservationService) {}

  /*
   * Gets reservations with legs
   * */
  @Get('reservation')
  async getReservations(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() filterValues: any
  ) {
    return this.reservationService.getReservations(business.companyId, {});
  }

  @Get('list')
  async getReservationList(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() filterValues: any
  ) {
    return {
      data: await this.reservationService.getReservations(
        business.companyId,
        {}
      ),
    };
  }

  @Get('reservation/:reservationId')
  getReservation(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Param('reservationId') reservationId: number,
    @Body() filterValues: any
  ) {
    // verify if reservation is private | user has access;
    return this.reservationService.getReservation(
      business.companyId,
      reservationId
    );
  }

  @Put('reservation')
  createReservation(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() reservation
  ) {
    if (!reservation) reservation = {};
    reservation.userId = 1;
    return this.reservationService.saveReservation(
      business.companyId,
      reservation
    );
  }

  @Patch('reservation/:reservationId')
  updateReservation(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() reservation,
    @Param('reservationId') reservationId
  ) {
    return this.reservationService.updateReservation(
      business.companyId,
      reservationId,
      reservation
    );
  }

  @Patch('reservation/:reservationId')
  deleteReservation(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() reservation,
    @Param('reservationId') reservationId
  ) {
    return this.reservationService.deleteReservation(
      business.companyId,
      reservationId
    );
  }
}
