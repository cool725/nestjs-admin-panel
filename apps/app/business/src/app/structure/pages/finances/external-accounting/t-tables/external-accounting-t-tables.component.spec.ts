import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAccountingTTablesComponent } from './external-accounting-t-tables.component';

describe('ExternalAccountingTestComponent', () => {
  let component: ExternalAccountingTTablesComponent;
  let fixture: ComponentFixture<ExternalAccountingTTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalAccountingTTablesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalAccountingTTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
