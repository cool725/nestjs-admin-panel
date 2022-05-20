import { Component, Injector, OnInit } from '@angular/core';
import { ItemServiceAPI } from '../item.api';
import { FormController } from '../../../../form.controller';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ItemService } from '../item.model';

@Component({
  selector: 'movit-item-service-form',
  templateUrl: './item-service-form.component.html',
  styleUrls: ['./item-service-form.component.css'],
})
export class ItemServiceFormComponent extends FormController<ItemService> {
  constructor(
    public api: ItemServiceAPI<ItemService, any>,
    override injector: Injector
  ) {
    super(injector);
  }

  getData(): void {
    if (this.getId()) {
      this.getService();
    } else {
      this.api.item$.next(new ItemService());
    }
  }

  getService(id = this.getId()) {
    this.onLoadAndSetData(
      this.api.getService(id),
      this.api.item$,
      ItemService.create
    );
  }

  saveService(service: ItemService) {
    this.api.item$.next(<any>null);
    return this.api.saveServiceItem(service).subscribe((service: any) => {
      const data = this.api.items$.getValue();
      if (service.labels && service.labels.length) {
        const label = service.labels.find((a: any) => (a.key = 'title'));
        if (label) {
          service.label = {
            [label.key]: {
              [label.languageId]: label.value,
            },
          };
          service.title = label.value;
        }
      }
      data.data.push(service);
      this.api.items$.next(data);
      console.log(service)
      this.closeModal()
    });
  }

  updateService(service: ItemService) {
    return this.api.updateServiceItem(service.itemId, service).subscribe(
      ()=> this.closeModal()
    );
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteService({ itemId }: ItemService) {
    this.closeModal()
    return this.api.deleteServiceItem(itemId).subscribe(() => this.getData());
  }

  cancel(){
    this.api.item$.next(null)
    this.closeModal()
  }
}
