import {Component, Injector, OnInit} from '@angular/core';
import {FormController} from "../../../../form.controller";
import {ItemCategory, ItemServiceAPI} from "../item.api";
import {Confirmable} from "../../../../../../../../../../../libs/app/common/decorators";

@Component({
  selector: 'movit-item-service-form',
  templateUrl: './item-service-category-form.component.html',
  styleUrls: ['./item-service-category-form.component.css'],
})
export class ItemServiceCategoryFormComponent extends FormController<any> implements OnInit {
  constructor(
      public api: ItemServiceAPI<any, any>,
      override injector: Injector
  ) {
    super(injector);
  }
  ngOnInit(): void {}

  override getData(): void {
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
  deleteCategory({ categoryId }: any) {
    this.api.category$.next(<any>null);
    return this.api
        .deleteCategoryItem(categoryId)
        .subscribe(() => this.getData());
  }
}
