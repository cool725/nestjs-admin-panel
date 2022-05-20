import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cacheable } from 'angular-cacheable';
import { environment } from '../../../../../../environments/environment';
import { ITableOptions } from '@movit/app/common';

@Injectable({
  providedIn: 'root',
})
export class AgendaAPI<Reservation> {
  reservation$ = new BehaviorSubject<Reservation | undefined>(undefined);
  reservations$ = new BehaviorSubject<ITableOptions<Reservation>>(<any>null);

  constructor(private http: HttpClient) {}

  protected getPath(path: string, subPath: string | number = ''): string {
    return (
      environment.api.url +
      '/frontoffice/agenda/' +
      path +
      '/' +
      (subPath ? subPath : '')
    );
  }

  getReservation(reservationId: number) {
    return this.http.get(this.getPath('reservation', reservationId));
  }

  getReservations(filter: HttpParams): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.getPath('reservation'), {
      params: filter,
    });
  }

  // return with pagination
  getReservationList(filter: HttpParams): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.getPath('reservation'), {
      params: filter,
    });
  }

  saveReservation(res: Partial<Reservation>) {
    return this.http.put(this.getPath('reservation'), res);
  }

  updateReservation(reservationId: number, res: Partial<Reservation>) {
    return this.http.patch(this.getPath('reservation', reservationId), res);
  }

  deleteReservation(reservationId: number) {
    return this.http.delete(this.getPath('reservation', reservationId), {});
  }

  // -- todo move these functions

  @Cacheable({})
  getSources() {
    return this.http.get<any[]>(this.getPath('/sources/source'));
  }

  searchProfiles(searchTerm: string) {
    return this.http.get<Reservation[]>(this.getPath('profiles'), {
      params: { searchTerm },
    });
  }
}
