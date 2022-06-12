export class ItemCategory {
    title: string
    color: string
    items: any[]
    children: ItemCategory[]
    isCollapsed: boolean


    static create(partial:Partial<ItemCategory> = {}){
        if(partial?.children){
            partial.children = partial.children.map( child => ItemCategory.create(child) )
        }
        return Object.assign(new ItemCategory(),partial)
    }

    // inline cache
    itemExistsInChild(item){
        const id = item.itemId;
        const items = this.getAllItems(true,true)
        return items.find(i=>i.itemId == id) != null ;
    }

    getAllItems(deep:boolean = true,skipSelf:boolean = false){
        const items      = [];
        const fetchChild = (children:ItemCategory) => {

            if(children.items){
                for(let i = 0;i<children.items.length;i++){
                    children.items[i].parentTitle = children.title
                }


                items.push(... children.items)
            }

            if(children.children && children.children.length){
                for(const child of children.children)
                    fetchChild(child)
            }

        }

        if(this.items && !skipSelf){
            items.push(... this.items)
        }

        if(this.children && this.children.length){
            for(const child of this.children)
                fetchChild(child)
        }

        return items
    }


}

export class ItemTransaction{

    itemId

    transactionId

    lineId = 1

    billId

    splitId

    active:boolean

    finalized = 0// enum

    title:string

    amount = 1;

    priceId:number

    private price = 0;

    static create(item?:any):ItemTransaction{
        return Object.assign(new ItemTransaction(),item || {})
    }

    setPrice(price){
        this.price = price.priceSell
    }

    set priceSingle(price){
        this.price = price
    }

    get priceSingle(){
        return this.price
    }

    get priceTotal(){
        return this.priceSingle * this.amount
    }

}