import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCollectionOverviewComponent } from './item-collection.overview.component';

describe('ItemServiceComponent', () => {
  let component: ItemCollectionOverviewComponent;
  let fixture: ComponentFixture<ItemCollectionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCollectionOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCollectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
