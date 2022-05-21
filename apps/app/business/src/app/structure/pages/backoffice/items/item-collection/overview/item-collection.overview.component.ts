import { Component, Injector, OnInit } from '@angular/core';
import { ItemController } from '../../item.controller';
import { Table } from '@movit/app/common';
import { ItemCollectionApi } from '../item-collection.api';

@Component({
  selector: 'movit-item-service',
  templateUrl: './item-collection.overview.component.html',
  styleUrls: ['./item-collection.overview.component.css'],
})
export class ItemCollectionOverviewComponent extends ItemController<any> {
  constructor(
    override injector: Injector,
    private api: ItemCollectionApi<any>
  ) {
    super(injector);
  }

  getData(): void {}
}
