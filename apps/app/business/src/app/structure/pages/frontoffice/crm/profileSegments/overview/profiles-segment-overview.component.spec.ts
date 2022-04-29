import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSegmentOverviewComponent } from './profiles-segment-overview.component';

describe('ProfilesSagmentOverviewComponent', () => {
  let component: ProfilesSegmentOverviewComponent;
  let fixture: ComponentFixture<ProfilesSegmentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesSegmentOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesSegmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
