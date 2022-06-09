import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';

import { ItemProductCategoryFormComponent } from './item-product-category-form.component';

@NgModule({
  declarations: [ItemProductCategoryFormComponent],
  imports: [CommonModule, FormsModule, MdbSharedModule, NzAntSharedModule],
  exports: [ItemProductCategoryFormComponent],
})

export class ItemProductCategoryModule { }
