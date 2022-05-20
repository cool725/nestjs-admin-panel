import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable({
  providedIn: 'root',
})
export class ProfilePriceClassAPI<PriceClass, FilterValues> {
  profilePriceClass$ = new BehaviorSubject<PriceClass | null>(<any>null);
  profilePriceClasses$ = new BehaviorSubject<ITableOptions<PriceClass>>(
    <any>null
  );

  constructor(
    @Optional()
    @Inject('apiPath')
    protected endpoint: string,
    private http: HttpClient
  ) {}

  protected getPath(path: string, subPath: string | number = ''): string {
    if (subPath != '') {
      return (
        this.endpoint + '/profiles/' + path + '/' + (subPath ? subPath : '')
      );
    } else {
      return this.endpoint + '/profiles/' + path;
    }
  }

  getPriceClass(priceClassId: number) {
    return this.http.get(this.getPath('price-class', priceClassId));
  }

  getPriceClasses(options?: FilterValues): Observable<PriceClass[]> {
    return this.http.get<PriceClass[]>(this.getPath('price-class'), options);
  }

  savePriceClass(profile: Partial<PriceClass>) {
    return this.http.put(this.getPath('price-class'), profile);
  }

  updatePriceClass(priceClassId: number, profile: Partial<PriceClass>) {
    return this.http.patch(this.getPath('price-class', priceClassId), profile);
  }

  deletePriceClass(priceClassId: number) {
    return this.http.delete(this.getPath('price-class', priceClassId), {});
  }
}
