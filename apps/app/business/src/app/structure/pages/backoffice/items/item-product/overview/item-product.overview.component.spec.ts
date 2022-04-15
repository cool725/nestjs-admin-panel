import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductOverviewComponent } from './item-product.overview.component';

describe('ItemServiceComponent', () => {
  let component: ItemProductOverviewComponent;
  let fixture: ComponentFixture<ItemProductOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemProductOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
