import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemSettingsComponent } from './settings.component';

describe('CashSystemSettingsComponent', () => {
  let component: CashSystemSettingsComponent;
  let fixture: ComponentFixture<CashSystemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
