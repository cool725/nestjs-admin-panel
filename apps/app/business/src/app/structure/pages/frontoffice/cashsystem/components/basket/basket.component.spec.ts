import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemBasketComponent } from './basket.component';

describe('CashSystemBasketComponent', () => {
  let component: CashSystemBasketComponent;
  let fixture: ComponentFixture<CashSystemBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemBasketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
