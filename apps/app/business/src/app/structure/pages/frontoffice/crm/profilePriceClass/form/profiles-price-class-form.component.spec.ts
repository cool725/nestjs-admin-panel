import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesPriceClassFormComponent } from './profiles-price-class-form.component';

describe('ProfilesSagmentFormComponent', () => {
  let component: ProfilesPriceClassFormComponent;
  let fixture: ComponentFixture<ProfilesPriceClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesPriceClassFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesPriceClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
