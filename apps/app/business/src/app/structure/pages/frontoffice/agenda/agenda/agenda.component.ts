import { Component, Inject, OnInit } from '@angular/core';
import { AgendaAPI } from './agenda.api.service';

@Component({
  selector: 'movit-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [],
})
export class AgendaComponent implements OnInit {
  constructor(protected api: AgendaAPI) {}

  ngOnInit(): void {}

  getReservations() {
    this.api.getReservations();
  }

  // move those functions inside modal
  saveReservation() {}
  deleteReservation() {}
  cancelReservation() {}
  confirmReservation() {}
}
