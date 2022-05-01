import {Body, Controller, Get, Put, UseGuards} from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import {ReservationService} from "@movit/api/reservation";
import {GetCompany} from "../../../../../../../../libs/api/business/src/business.decorator";
import {BusinessEntity} from "../../../../../../../../libs/api/business/src/entities/business.entity";
import {AuthUser, CompanyGuard, GetUser} from "@movit/api/auth";
import {AuthGuard} from "@nestjs/passport";

@Controller(FrontOffice.resolePaths([FrontOffice.Agenda.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeAgendaController {
  constructor(protected reservationService:ReservationService) {}

  @Get('alive')
  getData() {
    return 1;
  }

  @Put('reservation')
  createReservation(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Body() reservation
  ) {
    if(!reservation)reservation={}
    reservation.userId = 1;
    return this.reservationService.saveReservation(business.businessId,reservation)
  }

  updateReservation(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Body() reservation
  ){
    return this.reservationService.saveReservation(business.businessId,reservation)
  }

  getReservationsHead(){

  }

  /*
  * Gets reservations with legs
  * */
  getReservations(){

  }


}
