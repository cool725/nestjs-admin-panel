import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgendaAPI {
  constructor(
    @Optional()
    @Inject('apiPath')
    protected endpoint: string,
    private http: HttpClient
  ) {
    console.log(endpoint);
  }

  protected getPath(path: string, subPath: string | number = ''): string {
    return (
      this.endpoint + '/agenda/' + path + '/' + (subPath ? '/' + subPath : '')
    );
  }

  saveReservation(reservation: any) {
    return this.http.put(this.getPath('reservation'), reservation);
  }
  getReservationsFromUser() {
    return this.http.get(this.getPath('reservation'));
  }

  getReservations(parameters = {}) {
    return this.http.get(this.getPath('reservation'));
  }

  saveOrUpdateReservation() {}
}
