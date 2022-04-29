import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSagmentOverviewComponent } from './profiles-sagment-overview.component';

describe('ProfilesSagmentOverviewComponent', () => {
  let component: ProfilesSagmentOverviewComponent;
  let fixture: ComponentFixture<ProfilesSagmentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesSagmentOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesSagmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
