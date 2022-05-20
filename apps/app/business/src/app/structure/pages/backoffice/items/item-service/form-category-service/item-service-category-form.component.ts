import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ItemServiceAPI } from '../item.api';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ItemCategory, ItemService } from '../item.model';

@Component({
  selector: 'movit-item-service-form',
  templateUrl: './item-service-category-form.component.html',
  styleUrls: ['./item-service-category-form.component.css'],
})
export class ItemServiceCategoryFormComponent
  extends FormController<any>
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
    } else {
      this.api.category$.next(new ItemCategory());
    }
  }


  getCategory(id = this.getId()) {
    return this.onLoadAndSetData(
      this.api.getServiceCategory(id),
      this.api.category$,
      ItemCategory.create
    );
  }

  saveCategory(category: ItemCategory) {
    this.api.category$.next(<any>null);
    return this.api.saveServiceCategory(category).subscribe((service: any) => {
      this.cancel();
    });
  }

  updateCategory(category: ItemCategory) {
    this.api.category$.next(<any>null);
    return this.api
      .updateServiceCategory(category.categoryId, category)
      .subscribe((cat: any) =>
        this.cancel());
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteCategory({ categoryId }: any) {
    this.api.category$.next(null);
    return this.api
      .deleteCategoryItem(categoryId)
      .subscribe(() => this.getData());
  }

  cancel(){
    this.api.category$.next(null)
    this.closeModal()
  }
}
