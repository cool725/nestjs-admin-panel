import { Component, OnInit,OnDestroy,Input, EventEmitter ,Output} from '@angular/core';
import {Calculator} from "../../Model/Public.Calculator.Class";
import {colors} from '@angular-devkit/core/src/terminal';
import bold = colors.bold;

@Component({
  selector: 'app-cash-main-calculator',
  templateUrl: './cash.main.calculator.component.html',
  styleUrls: ['./cash.main.calculator.component.scss']
})
export class CashMainCalculatorComponent implements OnInit , OnDestroy {

  CC = new Calculator();

  iconMode = window.innerWidth<1200;

  @Input() layout     = true;
  @Input() isAbsolute = true;
  @Input() autoCashOutOnCC = false;
  @Input() canCancelItem   = false;
  @Input() canCashOut      = false;
  @Input() allowGroup      = false;
  @Input() priceGiven      = 0;
  @Input() priceTotal      = 0;
  @Input() cTitle          = '';

  @Input() canShowPayTill   = false;
  @Input() payTill         = 0;

  //display and styling
  @Input() inlineTotal= false;
  @Input() bottom= 0;
  @Input() buttonMaxWidth= 100;


  @Output() onCancelItem = new EventEmitter();
  @Output() onCashOut = new EventEmitter();
  @Output() onPay     = new EventEmitter();
  @Output() onPrint    = new EventEmitter();
  @Output() onAddCash:EventEmitter<{value:any}> = new EventEmitter();

  @Output() onOpts    = new EventEmitter();




  constructor() { }

  ngOnInit() {
    if(!this.iconMode)this.bottom+=5;
  }

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
    }else console.warn('canCashOut',this.canCashOut)
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

  noOptions(){
    alert('Keine Optionen verfügbar')
  }

  async getValue(text,typ,fallback=null){
    if(typ!='any'){
      let v = undefined;
      if(typ == 'number'){
        while (  isNaN(+v) ) {
          v = await prompt(text)
        }
      }


      return v || fallback
    }
    return await prompt(text) || fallback
  }

  async setValue(key,text,typ,fallback=null){
    this[key] = await this.getValue(text,typ,fallback)
  }

  optsUpdate(){
    this.onOpts.emit({
      cTitle:this.cTitle,
      payTill:this.payTill
    })
  }

}
