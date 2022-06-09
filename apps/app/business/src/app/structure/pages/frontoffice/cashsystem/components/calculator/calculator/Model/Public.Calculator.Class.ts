import { Component, Output, EventEmitter, Input } from '@angular/core'

export class Calculator {

  input:any = '';
  onPrint  :EventEmitter<any>  = new EventEmitter();
  onCancel :EventEmitter<any>  = new EventEmitter();
  onSubmit :EventEmitter<any>  = new EventEmitter();


  constructor(){

  }

  reset(){
    this.input = ''
  }

  getValue(){
    return this.input
  }

  onBtn(value:any){
    this.input+= (value+'')
  }

  onBtnOperator(operator){
    this.input += operator
  }

  calculate() {

    var inputString:any = this.input;

    if(!inputString)return

    // @ts-ignore
    var numbers:any = (inputString+'').split(/\+|\-|\×|\÷/g);
    // @ts-ignore
    var operators:any = (inputString+'').replace(/[0-9]|\./g, "").split("");


    var divide:any = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }

    this.input = numbers[0];

    this.onSubmit.emit(this.input);

  }

  private onBtnClear(){
    this.input = ''
  }
  private onBtnPrint(){
    this.onPrint.emit()
  }

  destory(){
    this.onPrint.unsubscribe()
    this.onCancel.unsubscribe()
    this.onSubmit.unsubscribe()
  }
}
