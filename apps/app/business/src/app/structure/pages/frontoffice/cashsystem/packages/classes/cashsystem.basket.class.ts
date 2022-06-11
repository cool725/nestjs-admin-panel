import {ItemTransaction} from "./cashsystem.item.class";
import {Subject} from "rxjs";
import {EventEmitter} from "@angular/core";

class PriceHandler{

    priceTotal         = 0;

    priceGiven    = 0;

    pricePayed    = 0;

    priceInvoice  = 0;

    priceCanceled = 0;

    priceOpen    = 0;

    priceChange        = 0;

    constructor(basket:CashSystemBasket) {}

    reset(){
        this.pricePayed    = 0;
        this.priceGiven    = 0;
        this.priceTotal         = 0;
        this.priceOpen     = 0;
        this.priceCanceled = 0;
        this.priceInvoice  = 0;
    }

}

export class CashSystemBasket{
    basketId:string;

    items:ItemTransaction[] = []

    payments:any[] = []

    readonly priceHandler:PriceHandler = new PriceHandler(this)

    public doUpdate(){
        this.updatePrice()
        this.ON.update$.next(true)
    }

    public updatePrice(){
        this.priceHandler.reset()

        for(let i = 0;i  < this.items.length;i++){
            const item    =  this.items[i];

            this.priceHandler.priceTotal   += item.active && item.finalized == 0 ? item.price : 0;
            this.priceHandler.priceTotal   += item.finalized > 0  ? item.price : 0;

            this.priceHandler.pricePayed    += item.finalized >= 1 ? item.price : 0;
            this.priceHandler.priceCanceled += item.finalized < 0  ? item.price : 0;
        }

        for(let i = 0; i < this.payments.length;i++){
            const payment   = this.payments[i];
            this.priceHandler.priceGiven += payment.finalized == 0 ? payment.price : 0;
            /*
                if(this.isInvoiceAcc(payment.accountId || payment.creditAccountId)){
                this.priceTotalInvoice += payment.finalized >= 1 ? payment.price : 0
                }
            * */
        }

        this.priceHandler.priceOpen = this.priceHandler.priceTotal - this.priceHandler.pricePayed;

        //this.verify();
        return this
    }
    
    public itemAdd(item:ItemTransaction, price, options:{emitEvent?:boolean} = {}){
        /*
        if(i.splitId && !this.billGroupId){
          this.billGroupId = i.splitId;
      }
      * */


        ItemTransaction.constructor
        item        = ItemTransaction.create(item);
        item.active = true;
        item.setPrice(price);

        if(this.itemIsUnique(item)){
            if(item.lineId == 1 || !item.lineId) item.lineId = this.items[0] ? (1+this.items[this.items.length-1].lineId) : item.lineId
            this.items.push(item as ItemTransaction)
        }

        this.doUpdate()
        //this.ON.addItem(item)
        //if(options.emitEvent)this.ON.save();
        return item
    }

    public itemRemove(lineId, save:boolean=false){
        const i =  this.items.findIndex(i=>i.lineId == lineId)
        if( i >= 0 ){
            if(this.items[i].amount > 1) this.items[i].amount--;
            else this.items.splice(i,1)

        }
        this.doUpdate()
        //if(save)this.ON.save()
    }

    private itemIsUnique(item:ItemTransaction){
        if( this.items.length === 0 ) return true;
        const eq = this.items.find(bI=>
            bI['employeeId'] === item['employeeId'] &&
            bI.itemId === item.itemId &&
            bI.billId === item.billId &&
            bI.finalized === item.finalized &&
            (bI.price === item.price   /*&& bI.amount === 1 ||  bI.amount > 1 && bI.priceSingle === item.priceSingle  */) &&
            bI.title === item.title   && bI.priceId === item.priceId)

        if(eq){
            eq.amount+=1;
        }else{
            return true
        }
        return false
    }


    // eslint-disable-next-line @typescript-eslint/member-ordering
    ON = {
        update$:new Subject(),
        save:new EventEmitter()
    }

    static calcVatVal(price , vat)  {
        // MwSt. = (Brutto-Preis / (100 + Mehrwertsteuersatz) ) * Mehrwertsteuersatz
        return (((price / ( 100 + vat)) * vat))
    };
}

 