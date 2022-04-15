import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '../../../../../../../../../../libs/app/common/lib/helper/helper.table.class';

@Injectable()
export class ItemServiceAPI<T, C> {
  readonly item$ = new BehaviorSubject<T>(<any>null);
  readonly items$ = new BehaviorSubject<ITableOptions<T>>(<any>{ data: [] });

  readonly category$ = new BehaviorSubject<C>(<any>null);
  readonly categories$ = new BehaviorSubject<ITableOptions<C>>(<any>{
    data: [],
  });

  constructor(
    @Inject('basePath') private basePath: string,
    private http: HttpClient
  ) {
    console.log('basePath:', basePath);
  }

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

  getServiceCategory(filter: any = {}) {
    return this.http.get(this.getPath('service', 'category'), filter);
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
}
