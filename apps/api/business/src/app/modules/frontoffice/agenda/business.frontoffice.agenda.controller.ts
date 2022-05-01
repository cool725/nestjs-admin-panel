import { Body, Controller, Get, Param, Patch, Put, UseGuards} from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { ReservationService } from "@movit/api/reservation";
import { GetCompany } from "../../../../../../../../libs/api/business/src/business.decorator";
import { BusinessEntity } from "../../../../../../../../libs/api/business/src/entities/business.entity";
import { AuthUser, CompanyGuard, GetUser} from "@movit/api/auth";
import { AuthGuard } from "@nestjs/passport";

@Controller(FrontOffice.resolePaths([ FrontOffice.Agenda.PATH ]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeAgendaController {
  constructor(protected reservationService:ReservationService) {}

  /*
 * Gets reservations with legs
 * */
  @Get('reservation')
  getReservations(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Body() filterValues:any
  ){
    return this.reservationService.getReservations(
        business.businessId,{}
    )
  }

  @Get('reservation/:reservationId')
  getReservation(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Param('reservationId') reservationId:number,
      @Body() filterValues:any
  ){
    // verify if reservation is private | user has access;
    return this.reservationService.getReservation(
        business.businessId,reservationId
    )
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

  @Patch('reservation/:reservationId')
  updateReservation(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Body() reservation,
      @Param('reservationId') reservationId,
  ){
    return this.reservationService.updateReservation(business.businessId,reservationId,reservation)
  }

  @Patch('reservation/:reservationId')
  deleteReservation(
      @GetCompany() business:BusinessEntity,
      @GetUser() user:AuthUser,
      @Body() reservation,
      @Param('reservationId') reservationId,
  ){
    return this.reservationService.deleteReservation(business.businessId,reservationId)
  }

}
