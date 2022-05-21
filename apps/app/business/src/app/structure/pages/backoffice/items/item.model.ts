export class Item {
    itemId: number;

    companyId: number;

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

    static create(item: Partial<Item>) {
        return Object.assign(new Item(), item);
    }

    public changeLang(id: number, key: string) {
        this.label[key].cLang = id;
    }
}

export class ItemCategory {
    categoryId: number;

    parentCategoryId: number;

    companyId: number;

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
        console.log(cat)
        return Object.assign(new ItemCategory(), cat);
    }
    public changeLang(id: number, key: string) {
        this.label[key].cLang = id;
    }
}

export class ItemVariant{

    companyId: number;

    priceId:number;

    type:string;

    readonly label: any = {};

    /*
     * DisplayTitle
     * Based on the selected language
     * */
    readonly title: string;

    priceSell:number;
    priceBuy:number;

    priceClassId:number;

    images = [];

    static create(variant?: Partial<ItemVariant>) {
        return Object.assign(new ItemVariant(), variant || {});
    }
}

