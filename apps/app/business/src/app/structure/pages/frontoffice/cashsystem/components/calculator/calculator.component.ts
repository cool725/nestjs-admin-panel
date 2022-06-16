import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Calculator } from './calculator/packages/calculator.class';

@Component({
  selector: 'movit-cashsystem-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CashSystemCalculatorComponent implements OnInit, OnDestroy {
  @Input() cashDirectlyMode = false;

  readonly CC = new Calculator();

  iconMode = window.innerWidth < 1200;

  @Input() layout = true;
  @Input() isAbsolute = true;
  @Input() autoCashOutOnCC = false;
  @Input() canCancelItem = false;
  @Input() canCashOut = false;
  @Input() allowGroup = false;
  @Input() priceGiven = 0;
  @Input() priceTotal = 0;
  @Input() cTitle = '';

  @Input() canShowPayTill = false;
  @Input() payTill = 0;

  //display and styling
  @Input() inlineTotal = false;
  @Input() bottom = 0;
  @Input() buttonMaxWidth = 100;

  @Output() onCancelItem = new EventEmitter();
  @Output() onCashOut = new EventEmitter();
  @Output() onPay = new EventEmitter();
  @Output() onPrint = new EventEmitter();
  @Output() onAddCash: EventEmitter<{ value: any }> = new EventEmitter();

  @Output() onOpts = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (!this.iconMode) this.bottom += 5;
  }

  ngOnDestroy() {
    this.CC.destory();
    [
      this.onCancelItem,
      this.onCashOut,
      this.onPay,
      this.onPrint,
      this.onAddCash,
    ].map((v) => v.unsubscribe());
  }

  clickCashOut() {
    if (this.canCashOut) {
      this.onCashOut.emit();
      this.CC.resetInput();
    } else console.warn('canCashOut', this.canCashOut);
  }

  clickCancelItem() {
    this.onCancelItem.emit();
  }

  clickAddCash() {
    this.onAddCash.emit({ value: this.CC.value });
    this.CC.resetInput();
  }

  clickPay() {
    this.onPay.emit({ value: this.CC.value });
    this.CC.resetInput();
  }

  clickPrint() {
    this.onPrint.emit();
  }

  noOptions() {
    alert('Keine Optionen verfügbar');
  }

  async getValue(text, typ, fallback = null) {
    if (typ != 'any') {
      let v = undefined;
      if (typ == 'number') {
        while (isNaN(+v)) {
          v = await prompt(text);
        }
      }

      return v || fallback;
    }
    return (await prompt(text)) || fallback;
  }

  async setValue(key, text, typ, fallback = null) {
    this[key] = await this.getValue(text, typ, fallback);
  }

  // todo rename keys
  optsUpdate() {
    this.onOpts.emit({
      cTitle: this.cTitle,
      payTill: this.payTill,
    });
  }
}
