import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AgendaAPI } from './agenda.api.service';
import { PageController } from '../../../page.controller';
import {EDataEmitterType} from "@movit/app/common";
import {ProfilesFormComponent} from "../../crm/profiles/form/profiles-form.component";
import {AgendaFormComponent} from "../form/agenda-form.component";

@Component({
  selector: 'movit-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [],
})
export class AgendaComponent extends PageController {
  constructor(override injector: Injector, protected api: AgendaAPI) {
    super(injector);
  }

  override getData() {
    this.getReservations();
  }

  getReservations() {
    this.api.getReservations();
  }

  // move those functions inside modal
  saveReservation() {
    this.api
      .saveReservation({
        title: 'test',
        start: '2022-05-05T12:00',
        end: '2022-05-05T13:00',
      })
      .subscribe();
  }

  editReservation(id:any){
   return this.openModal(AgendaFormComponent, {
        id: id,
   });
  }
  deleteReservation() {}
  cancelReservation() {}
  confirmReservation() {}
}
