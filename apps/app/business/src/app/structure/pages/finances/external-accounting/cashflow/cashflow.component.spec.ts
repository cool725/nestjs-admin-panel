import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAccountingCashFlowComponent } from './cashflow.component';

describe('CashflowComponent', () => {
  let component: ExternalAccountingCashFlowComponent;
  let fixture: ComponentFixture<ExternalAccountingCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalAccountingCashFlowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalAccountingCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
