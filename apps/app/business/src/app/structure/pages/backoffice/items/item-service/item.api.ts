import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '@movit/app/common';
import { environment } from '../../../../../../environments/environment';

const defaultValue: any = null;

@Injectable({
  providedIn: 'root',
})
export class ItemServiceAPI<T, C> {
  readonly item$:BehaviorSubject<T> = new BehaviorSubject<T>(<T>defaultValue);
  readonly items$ = new BehaviorSubject<ITableOptions<T>>(<any>{ data: [] });

  readonly category$ = new BehaviorSubject<C>(defaultValue);
  readonly categories$ = new BehaviorSubject<ITableOptions<C>>(<any>{
    data: [],
  });

  basePath: string = environment.api.url + '/' + 'backoffice/sales/items';

  constructor(private http: HttpClient) {}

  private getPath(
    path: string,
    subPath: string | number = '',
    subPath2: string | number = ''
  ) {
    return (
      this.basePath +
      '/' +
      path +
      (subPath ? '/' + subPath : '') +
      (subPath2 ? '/' + subPath2 : '')
    );
  }

  getServices(filterValues = {}) {
    return this.http.get(this.getPath('service'), filterValues);
  }

  getService(serviceId: number) {
    return this.http.get(this.getPath('service', serviceId));
  }

  saveServiceItem(serivce: T) {
    return this.http.put(this.getPath('service'), serivce);
  }

  updateServiceItem(serviceId: number, serivce: T) {
    return this.http.patch(this.getPath('service', serviceId), serivce);
  }

  deleteServiceItem(itemId: number, options: any = {}) {
    return this.http.delete(this.getPath('service', itemId), options);
  }
  deleteServicePriceItem(itemId: number,priceId:number, options: any = {}) {
    return this.http.delete(this.getPath('variant', itemId+'-'+priceId), options);
  }

  //

  getServiceCategory(categoryId: number) {
    return this.http.get<C>(this.getPath('service', 'category', categoryId));
  }

  getServiceCategories(filter: any = {}) {
    return this.http.get<C[]>(this.getPath('service', 'category'), filter);
  }

  saveServiceCategory(category: any) {
    return this.http.put(this.getPath('service', 'category'), category);
  }

  updateServiceCategory(catId: number, category: any) {
    return this.http.patch(
      this.getPath('service', 'category', catId),
      category
    );
  }

  deleteCategoryItem(categoryId: number, options: any = {}) {
    return this.http.delete(
      this.getPath('service', 'category', categoryId),
      options
    );
  }

  getEmployees(searchTerm:string = ''){
    return this.http.get(this.basePath + ('/employees?search='+searchTerm));
  }
}
