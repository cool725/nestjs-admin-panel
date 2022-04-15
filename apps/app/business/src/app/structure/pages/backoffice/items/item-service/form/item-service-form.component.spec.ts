import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceFormComponent } from './item-service-form.component';

describe('ItemServiceFormComponent', () => {
  let component: ItemServiceFormComponent;
  let fixture: ComponentFixture<ItemServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemServiceFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
