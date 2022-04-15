import { Component, Injector, OnInit } from '@angular/core';
import { ItemController } from '../../item.controller';
import { Table } from '../../../../../../../../../../../libs/app/common/lib/helper/helper.table.class';
import { ItemServiceAPI } from '../../item-service/item.api';

@Component({
  selector: 'movit-item-service',
  templateUrl: './item-product.overview.component.html',
  styleUrls: ['./item-product.overview.component.css'],
})
export class ItemProductOverviewComponent extends ItemController<any> {
  table = Table.create<any, any>(this.api.items$, {
    page: 1,
    searchValue: '',
  });

  constructor(
    override injector: Injector,
    private api: ItemServiceAPI<any, any>
  ) {
    super(injector);
  }

  getData(): void {}
}
