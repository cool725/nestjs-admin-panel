import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User.NewComponent } from './user.new.component';

describe('User.NewComponent', () => {
  let component: User.NewComponent;
  let fixture: ComponentFixture<User.NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ User.NewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(User.NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
