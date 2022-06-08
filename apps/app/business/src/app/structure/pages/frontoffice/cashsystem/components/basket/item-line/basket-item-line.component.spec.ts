import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemBasketItemLineComponent } from './basket-item-line.component';

describe('CashSystemBasketItemLineComponent', () => {
  let component: CashSystemBasketItemLineComponent;
  let fixture: ComponentFixture<CashSystemBasketItemLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemBasketItemLineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemBasketItemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
