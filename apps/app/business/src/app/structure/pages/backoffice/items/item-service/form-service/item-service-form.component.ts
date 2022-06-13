import { Component, Injector } from '@angular/core';
import { ItemServiceAPI } from '../item.api';
import { FormController } from '../../../../form.controller';
import { Confirmable } from '@movit/app/common';
import { ItemService } from '../item.model';
import {ItemCategory} from "../../item.model";
import {Observable} from "rxjs";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

@Component({
  selector: 'movit-item-service-form',
  templateUrl: './item-service-form.component.html',
  styleUrls: ['./item-service-form.component.css'],
})
export class ItemServiceFormComponent extends FormController<ItemService> {

  employees$:Observable<any[]> = <any>this.api.getEmployees();

  priceClasses:{title:string,priceClassId:number}[] = []

  constructor(public api: ItemServiceAPI<ItemService, ItemCategory>, override injector: Injector) {
    super(injector);
  }

  getData(): void {
    if (this.getId()) {
      this.getService();
    }

    this.api.getPriceClasses().subscribe( priceClasses =>  this.priceClasses = priceClasses)
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
      this.cancel(true);
    });
  }

  updateService(service: ItemService) {
    return this.api
      .updateServiceItem(service.itemId, service)
      .subscribe((service:any) => {

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
        const current = data.data.find(s => s.itemId == service.itemId)
        if(current) Object.assign(current,service)
        this.api.items$.next(data);
        this.cancel(true);
      });
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteService({ itemId }: ItemService) {
    return this.api.deleteServiceItem(itemId).subscribe(() => {
      this.cancel(true);
    });
  }

  @Confirmable({
    title: 'Ok?',
  })
  deletePriceItem({ itemId, priceId }:any) {
    return this.api.deleteServicePriceItem(itemId,priceId).subscribe();
  }

  // refactore
  async  handlePreview (file: any): Promise<void>  {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
   // this.previewImage = file.url || file.preview;
   // this.previewVisible = true;
  };

  cancel(emit = false) {
    if(emit)this.onCancel.next(null)
    this.api.item$.next(<any>null);
    this.closeModal();
  }
}
