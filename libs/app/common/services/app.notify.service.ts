import { Injectable } from '@angular/core';

declare const vNotify: any;

type vNotifyType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'notify'
  | undefined;

enum EvNotifyInterfacePosition {
  RIGHT = 'right',
  LEFT = 'left',
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface IvNotifyInterface {
  fadeInDuration: number;
  fadeOutDuration: number;
  fadeInterval: number;
  visibleDuration: number;
  postHoverVisibleDuration: number;
  position: EvNotifyInterfacePosition;
  sticky: boolean;
  showClose: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppNotifyService {
  private _options: IvNotifyInterface = {
    fadeInDuration: 800,
    fadeOutDuration: 200,
    fadeInterval: 50,
    visibleDuration: 2000,
    postHoverVisibleDuration: 500,
    position: EvNotifyInterfacePosition.RIGHT,
    sticky: false,
    showClose: true,
  };

  public setOptions(options: Partial<IvNotifyInterface> = {}) {
    Object.assign(this._options, options);
    return this;
  }

  show(typ: vNotifyType, values: { text?: string; title: string } | string) {
    if (typeof values === 'string') {
      values = {
        title: values,
      };
    }

    return vNotify[typ || 'notify']({
      ...this._options,
      ...values,
    });
  }
}
