import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '../../../../../../../../../../libs/app/common/lib/helper/helper.table.class';

@Injectable()
export class ItemProductAPI<T> {
  readonly item$ = new BehaviorSubject<T>(<any>null);
  readonly items$ = new BehaviorSubject<ITableOptions<T>>(<any>{ data: [] });

  constructor(
    @Inject('basePath') private basePath: string,
    private http: HttpClient
  ) {}

  private getPath(
    path: string,
    subPath: string | number = '',
    subPath2: string | number = ''
  ) {
    return (
      this.basePath +
      path +
      (subPath ? '/' + subPath : '') +
      (subPath2 ? '/' + subPath2 : '')
    );
  }

  getProduct(itemId: number) {
    return this.http.get(this.getPath('product', itemId));
  }
  getProducts() {
    return this.http.get(this.getPath('product'));
  }
  saveProductItem(product: any) {
    return this.http.put(this.getPath('product'), product);
  }
  updateProductItem(itemId: number, product: any) {
    return this.http.patch(this.getPath('product', itemId), product);
  }

  getProductCategory(filter: any = {}) {
    return this.http.get(this.getPath('product', 'category'), filter);
  }
  saveProductCategory(category: any) {
    return this.http.put(this.getPath('product', 'category'), category);
  }
  updateProductCategory(catId: number, category: any) {
    return this.http.patch(
      this.getPath('product', 'category', catId),
      category
    );
  }
}
