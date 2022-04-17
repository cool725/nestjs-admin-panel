import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesOverviewComponent } from './profiles-overview.component';

describe('ProfilesOverviewComponent', () => {
  let component: ProfilesOverviewComponent;
  let fixture: ComponentFixture<ProfilesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
