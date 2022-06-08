import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemReceiptComponent } from './receipt.component';

describe('CashSystemReceiptComponent', () => {
  let component: CashSystemReceiptComponent;
  let fixture: ComponentFixture<CashSystemReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemReceiptComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
