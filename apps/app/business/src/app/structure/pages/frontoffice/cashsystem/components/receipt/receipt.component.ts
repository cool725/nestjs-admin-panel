import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {CashSystemStore} from "../../packages/services/cashsystem.store";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'movit-cashsystem-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashSystemReceiptComponent {

  public get total(){
    return this.store.basket.priceHandler.priceTotal
  }

  public get paid(){
    return this.store.basket.priceHandler.pricePayed
  }

  public get invoice(){
    return this.store.basket.priceHandler.priceInvoice
  }

  public get change(){
    return this.store.basket.priceHandler.priceChange
  }

  currency = 'CHF'

  private ngUnsubscribe = new Subject<void>();

  constructor(private store:CashSystemStore,
              private cdr: ChangeDetectorRef) {

    store.basket.ON.update$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(()=>cdr.detectChanges());

  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
