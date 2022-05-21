import { Component, Injector, OnInit } from '@angular/core';
import { ItemController } from '../../item.controller';
import { Table } from '@movit/app/common';
import { ItemVoucherApi } from '../item-voucher.api';

@Component({
  selector: 'movit-item-service',
  templateUrl: './item-voucher.overview.component.html',
  styleUrls: ['./item-voucher.overview.component.css'],
})
export class ItemVoucherOverviewComponent extends ItemController<any> {
  constructor(override injector: Injector, private api: ItemVoucherApi<any>) {
    super(injector);
  }

  getData(): void {}
}
