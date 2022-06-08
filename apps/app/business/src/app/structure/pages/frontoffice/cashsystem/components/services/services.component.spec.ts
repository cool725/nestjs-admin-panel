import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemServicesComponent } from './services.component';

describe('CashSystemServicesComponent', () => {
  let component: CashSystemServicesComponent;
  let fixture: ComponentFixture<CashSystemServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemServicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
