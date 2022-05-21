import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVoucherOverviewComponent } from './item-voucher.overview.component';

describe('ItemServiceComponent', () => {
  let component: ItemVoucherOverviewComponent;
  let fixture: ComponentFixture<ItemVoucherOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemVoucherOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVoucherOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
