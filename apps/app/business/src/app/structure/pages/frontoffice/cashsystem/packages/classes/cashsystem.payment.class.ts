/*
 * Handle Pricing canclation
 * */
import { CashSystemBasket } from "./cashsystem.basket.class";

export class PriceHandler {
  priceTotal = 0;

  priceGiven = 0;

  pricePayed = 0;

  priceInvoice = 0;

  priceCanceled = 0;

  priceOpen = 0;

  priceChange = 0;

  constructor(private basket: CashSystemBasket) {}

  public updatePrice() {
    this.resetValues();

    for (let i = 0; i < this.basket.items.length; i++) {
      const item = this.basket.items[i];

      this.priceTotal += item.active && item.finalized == 0 ? item.priceTotal : 0;
      this.priceTotal += item.finalized > 0 ? item.priceTotal : 0;

      this.pricePayed += item.finalized >= 1 ? item.priceTotal : 0;
      this.priceCanceled += item.finalized < 0 ? item.priceTotal : 0;
    }

    for (let i = 0; i < this.basket.payments.length; i++) {
      const payment = this.basket.payments[i];
      this.priceGiven += payment.finalized == 0 ? payment.price : 0;
      /*
                if(this.isInvoiceAcc(payment.accountId || payment.creditAccountId)){
                this.priceTotalInvoice += payment.finalized >= 1 ? payment.price : 0
                }
            * */
    }

    this.priceOpen = this.priceTotal - this.pricePayed;

    return this;
  }

  resetValues() {
    this.pricePayed = 0;
    this.priceGiven = 0;
    this.priceTotal = 0;
    this.priceOpen = 0;
    this.priceCanceled = 0;
    this.priceInvoice = 0;
  }
}
