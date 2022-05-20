import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemServiceCategoryFormComponent } from './item-service-category-form.component';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';
import { ItemServiceAPI } from '../item.api';

@NgModule({
  declarations: [ItemServiceCategoryFormComponent],
  imports: [CommonModule, FormsModule, MdbSharedModule, NzAntSharedModule],
  exports: [ItemServiceCategoryFormComponent],
})
export class ItemServiceCategoryModule {}
