import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemCollectionOverviewComponent } from './overview/item-collection.overview.component';
import { ItemCollectionApi } from './item-collection.api';

const routes: Routes = [
  {
    path: '**',
    component: ItemCollectionOverviewComponent,
  },
];

@NgModule({
  declarations: [ItemCollectionOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ItemCollectionApi],
})
export class ItemCollectionModule {}
