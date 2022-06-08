import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceCategoryFormComponent } from './item-service-category-form.component';

describe('ItemServiceFormComponent', () => {
  let component: ItemServiceCategoryFormComponent;
  let fixture: ComponentFixture<ItemServiceCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemServiceCategoryFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemServiceCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
