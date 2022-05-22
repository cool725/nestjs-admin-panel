import { Component, Injector } from '@angular/core';
import { ItemServiceAPI } from '../item.api';
import { FormController } from '../../../../form.controller';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ItemService } from '../item.model';
import {ItemCategory} from "../../item.model";
import {NzUploadFile} from "ng-zorro-antd/upload";
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

  constructor(public api: ItemServiceAPI<ItemService, ItemCategory>, override injector: Injector) {
    super(injector);
  }

  getData(): void {
    if (this.getId()) {
      this.getService();
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
      this.cancel();
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
        this.cancel()
      });
  }

  @Confirmable({
    title: 'Ok?',
  })
  deleteService({ itemId }: ItemService) {
    this.cancel();
    return this.api.deleteServiceItem(itemId).subscribe(() => this.getData());
  }


  @Confirmable({
    title: 'Ok?',
  })
  deletePriceItem({ itemId, priceId }:any) {
    return this.api.deleteServicePriceItem(itemId,priceId).subscribe(() => this.getData());
  }

  // refactore
  async  handlePreview (file: any): Promise<void>  {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
   // this.previewImage = file.url || file.preview;
   // this.previewVisible = true;
  };

  cancel() {
    this.api.item$.next(<any>null);
    this.closeModal();
  }
}
