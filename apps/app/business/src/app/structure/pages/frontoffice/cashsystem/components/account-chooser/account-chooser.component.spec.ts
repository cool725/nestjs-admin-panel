import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemAccountChooserComponent } from './account-chooser.component';

describe('CashSystemAccountChooserComponent', () => {
  let component: CashSystemAccountChooserComponent;
  let fixture: ComponentFixture<CashSystemAccountChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashSystemAccountChooserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSystemAccountChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
