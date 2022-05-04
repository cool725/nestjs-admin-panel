import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesPriceClassOverviewComponent } from './profiles-price-class-overview.component';

describe('ProfilesPriceClassOverviewComponent', () => {
  let component: ProfilesPriceClassOverviewComponent;
  let fixture: ComponentFixture<ProfilesPriceClassOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesPriceClassOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesPriceClassOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
