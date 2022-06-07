import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUserComponent } from './user.component';

describe('SettingsUserComponent', () => {
  let component: SettingsUserComponent;
  let fixture: ComponentFixture<SettingsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
