import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSegmentFormComponent } from './profiles-segment-form.component';

describe('ProfilesSagmentFormComponent', () => {
  let component: ProfilesSegmentFormComponent;
  let fixture: ComponentFixture<ProfilesSegmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesSegmentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesSegmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
