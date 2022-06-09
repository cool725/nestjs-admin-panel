import { Component, OnInit,OnDestroy,Input, EventEmitter ,Output} from '@angular/core';
import {Calculator} from "../../Model/Public.Calculator.Class";
import {colors} from '@angular-devkit/core/src/terminal';
import bold = colors.bold;

@Component({
  selector: 'app-cash-mobile-calculator',
  templateUrl: './cash.main.calculator.component.html',
  styleUrls: ['./cash.main.calculator.component.scss']
})
export class CashMobileCalculatorComponent implements OnInit , OnDestroy {

  CC = new Calculator();

  @Input() isAbsolute = true;
  @Input() canCashOut = false;
  @Input() allowGroup = false;
  @Input() priceGiven = 0;
  @Input() priceTotal = 0;

  //display and styling
  @Input() inlineTotal= false;
  @Input() bottom= 0;
  @Input() buttonMaxWidth= 100;




  @Output() onCancelItem = new EventEmitter();
  @Output() onCashOut = new EventEmitter();
  @Output() onPay     = new EventEmitter();
  @Output() onPrint    = new EventEmitter();
  @Output() onAddCash:EventEmitter<{value:any}> = new EventEmitter();


  constructor() { }

  ngOnInit() {}

  ngOnDestroy(){
    this.CC.destory();
    [
      this.onCancelItem,
      this.onCashOut,
      this.onPay,
      this.onPrint,
      this.onAddCash
    ].map(v=>v.unsubscribe())
  }

  clickCashOut(){
    if(this.canCashOut){
      this.onCashOut.emit()
      this.CC.reset()
    }
  }

  clickCancelItem(){
    this.onCancelItem.emit()
  }
  clickAddCash(){
    this.onAddCash.emit({value:this.CC.getValue()})
    this.CC.reset()

  }
  clickPay(){
    this.onPay.emit({value:this.CC.getValue()})
    this.CC.reset()
  }
  clickPrint(){
    this.onPrint.emit()
  }
}
