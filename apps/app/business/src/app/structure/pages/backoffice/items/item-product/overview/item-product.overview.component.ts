import { Component, Injector, OnInit } from '@angular/core';
import { ItemController } from '../../item.controller';
import { Table } from '@movit/app/common';
import { ItemProductAPI } from '../item-product.api';

@Component({
  selector: 'movit-item-service',
  templateUrl: './item-product.overview.component.html',
  styleUrls: ['./item-product.overview.component.css'],
})
export class ItemProductOverviewComponent extends ItemController<any> {
  constructor(override injector: Injector, private api: ItemProductAPI<any>) {
    super(injector);
  }

  getData(): void {}
}
