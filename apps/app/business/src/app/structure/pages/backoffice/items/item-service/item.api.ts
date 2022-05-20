import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

class Item {
  itemId: number;

  companyId: number;

  label: any = {};

  readonly title: string;

  categoriesIds: any[] = [];

  order = 1;

  color = '';

  static create(item: Partial<Item>) {
    return Object.assign(new Item(), item);
  }



  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }
}

export class ItemService extends Item {
  override label = {
    title: <any>{},
    desc: <any>{},
  };

  static override create(item: Partial<Item>) {
    return Object.assign(new ItemService(), item);
  }
}

export class ItemCategory {
  categoryId: number;
  parentCategoryId: number;
  companyId: number;
  readonly title = '';
  readonly label: any = {
    title: <any>{},
    desc: <any>{},
  };

  order = 1;

  color = '';

  enabled = 1;

  readonly children: any = [];

  static create(cat: Partial<ItemCategory>) {
    return Object.assign(new ItemCategory(), cat);
  }
  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }
}

@Injectable()
export class ItemServiceAPI<T, C> {
  readonly item$ = new BehaviorSubject<T | null>(null);
  readonly items$ = new BehaviorSubject<ITableOptions<T>>(<any>{ data: [] });

  readonly category$ = new BehaviorSubject<C | null>(null);
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
