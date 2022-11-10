import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductCategoryFormComponent } from './item-product-category-form.component';

describe('ItemProductCategoryFormComponent', () => {
  let component: ItemProductCategoryFormComponent;
  let fixture: ComponentFixture<ItemProductCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemProductCategoryFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
