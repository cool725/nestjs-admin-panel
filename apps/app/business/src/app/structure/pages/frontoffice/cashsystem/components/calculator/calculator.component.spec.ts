import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemCalculatorComponent } from './calculator.component';

describe('CashSystemCalculatorComponent', () => {
  let component: CashSystemCalculatorComponent;
  let fixture: ComponentFixture<CashSystemCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemCalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
