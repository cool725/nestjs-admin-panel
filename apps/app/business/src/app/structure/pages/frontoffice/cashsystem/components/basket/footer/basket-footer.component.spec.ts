import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemBasketFooterComponent } from './basket-footer.component';

describe('CashSystemBasketFooterComponent', () => {
  let component: CashSystemBasketFooterComponent;
  let fixture: ComponentFixture<CashSystemBasketFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemBasketFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemBasketFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
