import {Item, ItemVariant} from "../item.model";

export class ItemService extends Item {
  override label = {
    title: <any>{},
    desc: <any>{},
  };

  override prices:ServiceVariant[] = [];

  static override create(item: Partial<Item>) {
    return Object.assign(new ItemService(), item);
  }

  public removeVariant(index:number){
    this.prices.splice(index,1);
  }

  public addVariant(v?:Partial<ServiceVariant>){
    this.prices.push(
        ServiceVariant.create(v)
    )
  }
}

export class ServiceVariant extends ItemVariant {

  duration:Date;
  bufferTimeStart:Date;
  bufferTimeEnd:Date;

  static override create(item?: Partial<ServiceVariant>) {
    return Object.assign(new ServiceVariant(), item || {});
  }
}
