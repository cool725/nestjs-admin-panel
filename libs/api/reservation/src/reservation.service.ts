import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationRepository } from "./classes/reservation.repository";

@Injectable()
export class ReservationService {
  constructor(
      @InjectRepository(ReservationRepository)
      private resHeadRepo: ReservationRepository,
      @InjectRepository(ReservationRepository)
      private resLegRepo: ReservationRepository
  ) {
  }

  saveReservation(businessId,reservation){
    const resHead = this.resHeadRepo.create();
      resHead.companyId = businessId;
      resHead.start = reservation.start;
      resHead.title = reservation.title;
      resHead.userId = reservation.userId
      resHead.reservationId = 1;
      return this.resHeadRepo.save(resHead);
  }

  async updateReservation(businessId,reservationId,reservation:any){
    const resHead = await this.resHeadRepo.findOne({where:{businessId:businessId,reservationId:reservationId}});
  }

  setReservationState(businessId:number,reservationId:number,state:number){

  }

  deleteSoftReservation(businessId:number,reservationId:number){

  }

}


