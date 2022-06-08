import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainCashSystemComponent } from './main-cashsystem.component';

describe('MainCashSystemComponent', () => {
  let component: MainCashSystemComponent;
  let fixture: ComponentFixture<MainCashSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCashSystemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCashSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
