import { ItemTransaction } from "./cashsystem.item.class";
import { Subject } from "rxjs";
import { EventEmitter } from "@angular/core";
import { AccountSelectionHandler } from "./cashsystem.account.class";
import { Payment } from "./cashsystem.price.class";
import { PriceHandler } from "./cashsystem.payment.class";

export class ItemBillGroup {
  billGroupId;
  billId: string;
  dateKey: string;
  items: ItemTransaction[] = [];

  setBillId(billId) {
    this.billId = billId;
    return this;
  }

  get priceTotal() {
    let total = 0;
    this.items.forEach(i => (total += i.priceTotal));
    return total;
  }
}

export class CashSystemBasket {
  basketId: string;

  items: ItemTransaction[] = [];

  itemBillGroups: ItemBillGroup[] = [];

  payments: Payment[] = [];

  public canCashOut = false;

  public readonly priceHandler: PriceHandler = new PriceHandler(this);

  protected readonly accountSelection: AccountSelectionHandler = new AccountSelectionHandler(this);

  public get accountSelectionId(): number {
    return this.accountSelection.accountId;
  }

  public doUpdate() {
    this.updatePrice();
    this.updateGroups();
    this.ON.update$.next(true);
  }

  public updatePrice() {
    this.priceHandler.updatePrice();
    this.verifyBasket();
    return this;
  }

  /**
   * Update Items and group by Bill ID
   * and items that has not bill Id
   * */
  protected updateGroups() {
    this.itemBillGroups = [];
    this.items.forEach(item => {
      if (this.itemBillGroups.length === 0) {
        const itemBillGroup = new ItemBillGroup();
        itemBillGroup.setBillId(item.billId);
        itemBillGroup.items.push(item);
        this.itemBillGroups.push(itemBillGroup);
        return;
      } else {
        let bill = this.itemBillGroups.find(
          b => b.billId == item.billId || (!b.billId && !item.billId)
        );
        if (bill) bill.items.push(item);
        else {
          bill = new ItemBillGroup();
          bill.setBillId(item.billId);
          bill.items.push(item);
          // bill.ON.cancelBill = ()=> this.ON.cancelBill(bill);
          this.itemBillGroups.push(bill);
        }
      }
    });
  }

  public accountIdChange(id, replacePayment = true) {
    this.accountSelection.setAccountId(id);
  }

  public get accountIsCash() {
    return this.accountSelection.accountSelectionIsCash;
  }

  public get accountSelectionIsBill() {
    return this.accountSelection.accountSelectionIsBill;
  }

  public get accountSelectionIsCC() {
    return this.accountSelection.accountSelectionIsBill;
  }

  public itemAdd(item: ItemTransaction, price, options: { emitEvent?: boolean } = {}) {
    /*
        if(i.splitId && !this.billGroupId){
          this.billGroupId = i.splitId;
      }
      * */

    ItemTransaction.constructor;
    item = ItemTransaction.create(item);
    item.active = true;
    item.setPrice(price);

    /**
     * Add item or increment counting
     * */
    if (this.itemIsUnique(item, true)) {
      if (item.lineId == 1 || !item.lineId)
        item.lineId = this.items[0] ? this.items[this.items.length - 1].lineId + 1 : item.lineId;
      this.items.push(item as ItemTransaction);
    }

    this.doUpdate();
    //this.ON.addItem(item)
    //if(options.emitEvent)this.ON.save();
    return item;
  }

  public itemRemove(lineId, save: boolean = false) {
    const i = this.items.findIndex(i => i.lineId == lineId);
    if (i >= 0) {
      if (this.items[i].amount > 1) this.items[i].amount--;
      else this.items.splice(i, 1);
    }
    this.doUpdate();
    //if(save)this.ON.save()
  }

  private itemIsUnique(item: ItemTransaction, incrementCounting = true) {
    if (this.items.length === 0) return true;
    const eq = this.items.find(
      bI =>
        bI["employeeId"] === item["employeeId"] &&
        bI.itemId === item.itemId &&
        bI.billId === item.billId &&
        bI.finalized === item.finalized &&
        bI.priceSingle ===
          item.priceSingle /*&& bI.amount === 1 ||  bI.amount > 1 && bI.priceSingle === item.priceSingle  */ &&
        bI.title === item.title &&
        bI.priceId === item.priceId
    );
    if (eq && incrementCounting) eq.amount += 1;
    return !eq;
  }

  protected paymentsFilterActive(index: number = undefined): Payment | Payment[] {
    const payments = this.payments.filter(payment => payment.finalized == 0 && payment.active);
    return index >= 0 ? payments[index] : payments;
  }

  public verifyBasket() {
    this.priceHandler.updatePrice();
    const [price, priceOpen] = [this.priceHandler.priceTotal, this.priceHandler.priceOpen];

    if (this.accountSelection) {
      this.canCashOut = priceOpen <= this.priceHandler.priceGiven;
    }

    switch (this.accountSelection.accountSelectionType) {
      case "CASH": {
        this.canCashOut = priceOpen <= this.priceHandler.priceGiven;
        break;
      }
      case "BILL": {
        this.canCashOut = price > 0;
        break;
      }
      default: {
        this.canCashOut = price > 0;
        break;
      }
    }
  }

  public cashoutInfos() {
    return {
      finDate: new Date().asSql(),
      // reservationId: this.reservationId,
      // orderId: this.orderId,
      // billGroupId: this.billGroupId,
      // profileId: this.profiles[0] ? this.profiles[0].profileId : null,
      //  description: this.description,
    };
  }

  public cashOut() {
    this.verifyBasket();
    console.log(this.canCashOut);
    if (this.canCashOut) {
      switch (this.accountSelection.accountSelectionType) {
        case "CASH": {
          break;
        }
        case "BILL": {
          break;
        }
        case "CC": {
          this.cashOutCCMode();
          break;
        }
      }
    }
  }

  private cashOutCCMode() {
    const timeStamp = +new Date();
    let items = this.items.filter(i => i.finalized == 0 && i.active && !i.blocked);

    if ((this.paymentsFilterActive(/* countOpenPayments */) as Payment[]).length === 0) {
      // add payment
      console.log(
        items.reduce(function (total, item) {
          return total + item.priceTotal;
        }, 0)
      );
      this.payments.push(
        Payment.create({
          price: 0,
          finalized: 0,
          accountId: this.accountSelection.accountId,
          blocked: timeStamp,
        })
      );
    }
    const payment: Payment = this.paymentsFilterActive(0) as Payment;

    const infos = this.cashoutInfos();

    // Set unique id for matching
    payment.blocked = timeStamp;
    items = items.map(item => {
      item.blocked = timeStamp;
      payment.price += item.priceTotal;
      return item;
    });

    this.priceHandler.priceChange = 0;

    // block reCashout
    this.canCashOut = false;
    this.ON.cashOut$.next({
      ...infos,
      items: [...items],
      payments: [payment],
    });
  }

  static calcVatVal(price, vat) {
    // MwSt. = (Brutto-Preis / (100 + Mehrwertsteuersatz) ) * Mehrwertsteuersatz
    return (price / (100 + vat)) * vat;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ON = {
    save: new EventEmitter(),
    update$: new Subject(),
    cashOut$: new Subject<{
      finDate: string;
      reservationId?: number;
      profileId?: number;
      payments: Payment[];
      items: ItemTransaction[];
    }>(),
  };
}
