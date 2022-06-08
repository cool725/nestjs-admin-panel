import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemBasketHeaderComponent } from './basket-header.component';

describe('CashSystemBasketHeaderComponent', () => {
  let component: CashSystemBasketHeaderComponent;
  let fixture: ComponentFixture<CashSystemBasketHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemBasketHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemBasketHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
