import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductFormComponent } from './item-product-form.component';

describe('ItemProductFormComponent', () => {
  let component: ItemProductFormComponent;
  let fixture: ComponentFixture<ItemProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemProductFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
