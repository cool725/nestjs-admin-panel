import { Component, Inject, Injector, OnInit } from '@angular/core';
import { PageController } from '../../../page.controller';
import { AgendaFormComponent } from '../form/agenda-form.component';
import { AgendaAPI } from '../packages/agenda-api.service';

@Component({
  selector: 'movit-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [],
})
export class AgendaComponent extends PageController {
  constructor(override injector: Injector, protected api: AgendaAPI<any>) {
    super(injector);
  }

  override getData() {
    this.getReservations();
  }

  getReservations() {
    this.api.getReservations(<any>{});
  }

  editReservation(id: any) {
    return this.openModal(AgendaFormComponent, {
      id: id,
    });
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

  deleteReservation() {}

  cancelReservation() {}

  confirmReservation() {}
}
