export abstract class Item {
    itemId: number;

    companyId: number;

    abstract type:string

    readonly label: any = {};

    /*
     * DisplayTitle
     * Based on the selected language
     * */
    readonly title: string;

    order = 1;

    color = '';

    categoriesIds: number[] = [];
    collectionIds: number[] = [];

    prices:ItemVariant[]

    public changeLang(id: number, key: string) {
        this.label[key].cLang = id;
    }
}

export class ItemCategory {
    categoryId: number;

    parentCategoryId: number;

    companyId: number;

    type: string;

    readonly title = '';
    readonly label: any = {
        title: <any>{},
        desc: <any>{},
    };

    order = 1;

    color = '';

    enabled = 1;

    readonly children: any = [];

    static create(cat: Partial<ItemCategory>) {
        return Object.assign(new ItemCategory(), cat);
    }
    public changeLang(id: number, key: string) {
        this.label[key].cLang = id;
    }
}

export class ItemVariant{

    companyId: number;

    itemId:number;

    type:string;

    crmPriceClassId:number;

    readonly label: any = {
        title:{}
    };

    /*
     * DisplayTitle
     * Based on the selected language
     * */
    readonly title: string;

    priceSell:number;
    priceBuy:number;

    priceClassId:number;

    images:any[] = [];

    static create(variant?: Partial<ItemVariant>) {
        return Object.assign(new ItemVariant(), variant || {});
    }
}

