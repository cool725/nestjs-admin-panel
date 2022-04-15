import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceOverviewComponent } from './item-service.overview.component';

describe('ItemServiceComponent', () => {
  let component: ItemServiceOverviewComponent;
  let fixture: ComponentFixture<ItemServiceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemServiceOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemServiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
