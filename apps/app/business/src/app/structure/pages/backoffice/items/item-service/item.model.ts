import { Item, ItemVariant } from '../item.model';

export class ItemService extends Item {
  override type = 'S';

  // create class for this
  override label = {
    title: <any>{},
    desc: <any>{},
  };

  override prices: ServiceVariant[] = [];

  employees: any = {};

  static create(item: Partial<Item>) {
    const newItem = new ItemService();

    if (item.label) {
      newItem.label = Object.assign(newItem.label, item.label);
      delete (<any>item).label;
    }

    if (item.prices) {
      item.prices.map((price) => {
        newItem.addVariant(price);
      });

      delete (<any>item).prices;
    }

    return Object.assign(newItem, item);
  }

  public itemValid(): boolean {
    return this.prices.every(
      (price) => !!price.priceSell || price.priceSell === 0
    );
  }

  public removeVariant(index: number) {
    this.prices.splice(index, 1);
  }

  public addVariant(v?: Partial<ServiceVariant>) {
    this.prices.push(
      ServiceVariant.create({
        ...(v || {}),
        type: this.type,
      })
    );
  }
}

export class ServiceVariant extends ItemVariant {
  duration: number;
  bufferTimeStart: number;
  bufferTimeEnd: number;

  static override create(item?: Partial<ServiceVariant>) {
    const newItem = new ServiceVariant();
    if (item?.label) {
      for (const key in newItem.label) {
        newItem.label[key] = Object.assign(
          newItem.label[key],
          item.label[key] || {}
        );
      }

      delete (<any>item).label;
    }
    return Object.assign(newItem, item || {});
  }
}
