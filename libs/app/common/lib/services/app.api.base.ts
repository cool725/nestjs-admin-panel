import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

type EId = string | number;

@Injectable()
export abstract class AppApiBase<T, FilterParams = any> {
  protected abstract baseUrl: any; // = '/';

  constructor(protected http: HttpClient) {}

  protected getUrl(path: string | number) {
    return this.baseUrl + path;
  }

  public get(id: EId): Observable<T> {
    return this.http.get<T>(this.getUrl(id));
  }

  public list(params: FilterParams) {
    return this.http.get(this.getUrl(''), params);
  }

  public save(id: EId, params: Partial<T>) {
    return this.http.put(this.getUrl(id), params);
  }

  public update(id: EId, params: Partial<T>) {
    return this.http.patch(this.getUrl(id), params);
  }

  public delete(id: EId) {
    return this.http.delete(this.getUrl(id));
  }
}
