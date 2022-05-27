import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ItemServiceAPI } from '../item.api';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ItemService } from '../item.model';
import {ItemCategory} from "../../item.model";

@Component({
  selector: 'movit-item-service-category-form',
  templateUrl: './item-service-category-form.component.html',
  styleUrls: ['./item-service-category-form.component.css'],
})
export class ItemServiceCategoryFormComponent
  extends FormController<ItemCategory>
  implements OnInit
{
  constructor(
    public api: ItemServiceAPI<ItemService, ItemCategory>,
    override injector: Injector
  ) {
    super(injector);
  }
  ngOnInit(): void {}

  override getData(): void {
    if (this.getId()) {
      this.getCategory();
    }
  }

  getCategory(id = this.getId()) {
    return this.onLoadAndSetData(
      this.api.getServiceCategories(id),
      this.api.category$,
      ItemCategory.create
    );
  }

  saveCategory(category: ItemCategory) {
    return this.api.saveServiceCategory(category).subscribe((cat: any) => {
      this.onSave.emit(cat);
      this.cancel();
    });
  }

  updateCategory(category: ItemCategory) {
    return this.api
      .updateServiceCategory(category.categoryId, category)
      .subscribe((cat: any) => {
        this.onSave.emit(cat);
        this.cancel();
      });
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

  cancel() {
    this.api.category$.next(<any>null);
    this.closeModal();
  }
}
