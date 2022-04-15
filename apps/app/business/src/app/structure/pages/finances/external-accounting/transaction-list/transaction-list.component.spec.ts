import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAccountingTransactionListComponent } from './transaction-list.component';

describe('ExternalAccountingTransactionListComponent', () => {
  let component: ExternalAccountingTransactionListComponent;
  let fixture: ComponentFixture<ExternalAccountingTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalAccountingTransactionListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ExternalAccountingTransactionListComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
