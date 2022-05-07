import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesComponent } from './locales.component';

describe('LocalesComponent', () => {
  let component: LocalesComponent;
  let fixture: ComponentFixture<LocalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
