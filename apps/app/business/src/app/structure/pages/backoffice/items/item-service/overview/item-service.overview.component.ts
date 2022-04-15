import { Component, Injector } from '@angular/core';
import { ItemController } from '../../item.controller';
import { Table } from '../../../../../../../../../../../libs/app/common/lib/helper/helper.table.class';

import { Confirmable } from '@movit/app/decorators';
import { ItemServiceAPI } from '../item.api';

class Item {
  itemId: number;

  companyId: number;

  label: any = {};

  readonly title: string;

  static create(item: Partial<Item>) {
    return Object.assign(new Item(), item);
  }

  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }

  categoriesIds: any[] = [];

  order = 1;

  color = '';
}

class ItemService extends Item {
  override label = {
    title: <any>{},
    desc: <any>{},
  };

  static override create(item: Partial<Item>) {
    return Object.assign(new ItemService(), item);
  }
}

class ItemCategory {
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

  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }
  static create(cat: Partial<ItemCategory>) {
    return Object.assign(new ItemCategory(), cat);
  }
}

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
    override injector: Injector,
    public api: ItemServiceAPI<ItemService, ItemCategory>
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
        return this.api.item$.next(new ItemService());
      }
      case 'category': {
        return this.api.category$.next(new ItemCategory());
      }
    }
  }

  saveService(service: ItemService) {
    this.api.item$.next(<any>null);
    return this.api.saveServiceItem(service).subscribe((service: any) => {
      const data = this.api.items$.getValue();
      if (service.labels && service.labels.length) {
        let label = service.labels.find((a: any) => (a.key = 'title'));
        if (label) {
          service.label = {
            [label.key]: {
              [label.languageId]: label.value,
            },
          };
          service.title = label.value;
        }
      }
      data.data.push(service);
      this.api.items$.next(data);
    });
  }

  updateService(service: ItemService) {
    this.api.item$.next(<any>null);
    return this.api.updateServiceItem(service.itemId, service).subscribe();
  }

  editService({ itemId }: ItemService) {
    return this.onLoadAndSetData(
      this.api.getService(itemId),
      this.api.item$,
      ItemService.create
    );
  }
  editCategory({ categoryId }: ItemCategory) {
    return this.onLoadAndSetData(
      this.api.getServiceCategory(categoryId),
      this.api.category$,
      ItemCategory.create
    );
  }

  saveCategory(category: ItemCategory) {
    this.api.category$.next(<any>null);
    return this.api.saveServiceCategory(category).subscribe((service: any) => {
      this.getData();
    });
  }

  updateCategory(category: ItemCategory) {
    this.api.category$.next(<any>null);
    return this.api
      .updateServiceCategory(category.categoryId, category)
      .subscribe((cat: any) => {
        this.getData();
      });
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
