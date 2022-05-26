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
import {Company, GetCompany} from '@movit/api/business';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import {GetPagination, Pagination} from "../../../../../../../../../libs/api/common/decorator";

@Controller(FrontOffice.resolePaths([FrontOffice.Agenda.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeAgendaController {
  constructor(protected reservationService: ReservationService) {}

  /*
   * Gets reservations with legs
   * */
  @Get('reservation')
  async getReservations(
    @GetCompany() business: Company,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.reservationService.getReservationsPaginated(business.companyId, pagination);
  }

  @Get('list')
  async getReservationList(
    @GetCompany() business: Company,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: Pagination
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
    @GetCompany() business: Company,
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
    @GetCompany() business: Company,
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
    @GetCompany() business: Company,
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
    @GetCompany() business: Company,
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
