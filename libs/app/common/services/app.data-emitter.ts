import { EventEmitter, Injectable } from '@angular/core';

interface IDataEmitterEvent {
  data: any;
  eventName: string;
  resolver?: () => any;
}

export enum EDataEmitterType {
  DataReload = 'dataReload',
  TopBarTemplate = 'TopBarTemplate',

  // todo sub types of modal
  ModalOpen = 'ModalOpen',
}

@Injectable({
  providedIn: 'root',
})
export class DataEmitter {
  private on: EventEmitter<IDataEmitterEvent> =
    new EventEmitter<IDataEmitterEvent>();

  /**
   * Register Event
   * */
  public register(
    eventName: EDataEmitterType,
    cb: (data?: any, resolver?: any) => any
  ) {
    return this.on.subscribe((event: IDataEmitterEvent) => {
      if (event.eventName == eventName) {
        cb(event.data, event.resolver);
      }
    });
  }

  /**
   * Trigger Event
   * */
  public emit(eventName: EDataEmitterType, data?: any, resolver?: any) {
    return this.on.emit({
      eventName: eventName,
      data: data,
      resolver: resolver,
    });
  }
}
