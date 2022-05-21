import { Component, Injector } from '@angular/core';
import { ItemController } from '../../item.controller';

import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ItemServiceAPI } from '../item.api';
import { Table } from '@movit/app/common';
import {  ItemService } from '../item.model';
import {ItemCategory} from "../../item.model";

@Component({
  selector: 'movit-item-service',
  templateUrl: './item-service.overview.component.html',
  styleUrls: ['./item-service.overview.component.scss'],
})
export class ItemServiceOverviewComponent extends ItemController<ItemService> {
  tableServices = Table.create<ItemService, any>(this.api.items$, {
    page: 1,
    searchValue: '',
  });

  tableCategories = Table.create<ItemCategory, any>(this.api.categories$, {
    page: 1,
    searchValue: '',
    _categoryId: '',
  });

  constructor(
    public api: ItemServiceAPI<ItemService, ItemCategory>,
    override injector: Injector
  ) {
    super(injector);
  }

  getData(): void {
    this.getServices();
    this.getCategories();
  }

  getServices() {
    this.onLoadAndSetData(
      this.api.getServices(this.tableServices.filterValues),
      this.api.items$
    );
  }

  getCategories() {
    this.onLoadAndSetData(
      this.api.getServiceCategories(
        this.tableServices.getFilterValuesAsHttpParams()
      ),
      this.api.categories$
    );
  }

  create(type: 'service' | 'category') {
    switch (type) {
      case 'service': {
        return this.api.item$.next(new ItemService());
      }
      case 'category': {
        return this.api.category$.next(new ItemCategory());
      }
    }
  }

  editService({ itemId }: ItemService) {
    return this.api
      .getService(itemId)
      .subscribe((service) => this.api.item$.next(ItemService.create(service)));
  }

  editCategory({ categoryId }: ItemCategory) {
    return this.api
      .getServiceCategory(categoryId)
      .subscribe((cat) => this.api.category$.next(ItemCategory.create(cat)));
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteService({ itemId }: ItemService) {
    this.api.item$.next(<any>null);
    return this.api.deleteServiceItem(itemId).subscribe(() => this.getData());
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteCategory({ categoryId }: any) {
    this.api.category$.next(<any>null);
    return this.api
      .deleteCategoryItem(categoryId)
      .subscribe(() => this.getData());
  }

  log(c: any) {
    console.log(c);
  }
}
