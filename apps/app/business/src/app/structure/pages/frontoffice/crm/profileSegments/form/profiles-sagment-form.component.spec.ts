import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesSagmentFormComponent } from './profiles-sagment-form.component';

describe('ProfilesSagmentFormComponent', () => {
  let component: ProfilesSagmentFormComponent;
  let fixture: ComponentFixture<ProfilesSagmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilesSagmentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesSagmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
