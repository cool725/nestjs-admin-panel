import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgendaAPI {
  constructor(
    @Inject('basePath') private basePath: string,
    protected http: HttpClient
  ) {
    console.log(this.getURL(''));
  }

  getURL(path: string) {
    return this.basePath + path;
  }

  getReservationsFromUser() {
    return this.http.get(this.getURL(''));
  }

  getReservations(parameters = {}) {
    return this.http.get(this.getURL(''));
  }

  saveOrUpdateReservation() {}
}
