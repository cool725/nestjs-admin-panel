import { Component, Injector } from '@angular/core';
import { ItemController } from '../../item.controller';

import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import {ItemCategory, ItemService, ItemServiceAPI } from '../item.api';
import { Table } from '@movit/app/common';
import {ItemServiceFormComponent} from "../form-service/item-service-form.component";
import {ItemServiceCategoryFormComponent} from "../form-category-service/item-service-category-form.component";





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
      this.api.getServiceCategory(this.tableServices.filterValues),
      this.api.categories$
    );
  }

  create(type: 'service' | 'category') {
    switch (type) {
      case 'service': {
        return this.openModal(
            ItemServiceFormComponent
        )
      }
      case 'category': {
        return this.openModal(
            ItemServiceCategoryFormComponent
        );
      }
    }
  }


  editService({ itemId }: ItemService) {
    return this.openModal(ItemService,{
      id:itemId
    })
  }
  editCategory({ categoryId }: ItemCategory) {
    return this.onLoadAndSetData(
      this.api.getServiceCategory(categoryId),
      this.api.category$,
      ItemCategory.create
    );
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
