class Item {
  itemId: number;

  companyId: number;

  label: any = {};

  readonly title: string;

  categoriesIds: any[] = [];

  order = 1;

  color = '';

  static create(item: Partial<Item>) {
    return Object.assign(new Item(), item);
  }

  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }
}

export class ItemService extends Item {
  override label = {
    title: <any>{},
    desc: <any>{},
  };

  static override create(item: Partial<Item>) {
    return Object.assign(new ItemService(), item);
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
    return Object.assign(new ItemCategory(), cat);
  }
  public changeLang(id: number, key: string) {
    this.label[key].cLang = id;
  }
}
