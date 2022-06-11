import {ItemTransaction} from "./cashsystem.item.class";

export class CashSystemBasket{
    basketId:string;

    items:ItemTransaction[] = []

    doUpdate(){

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
        this.ON.addItem(item)
        if(options.emitEvent)this.ON.save();
        return item
    }

    public itemRemove(lineId, save:boolean=false){
        const i =  this.items.findIndex(i=>i.lineId == lineId)
        if( i >= 0 ){
            if(this.items[i].amount > 1) this.items[i].amount--;
            else this.items.splice(i,1)

        }
        this.doUpdate()
        if(save)this.ON.save()
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
    ON:any = {}
}

 