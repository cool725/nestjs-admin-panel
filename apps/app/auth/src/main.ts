import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const setUuId = () => {
  const __ = window;
  const key: any = '_uuId';

  Object.defineProperty(window, 'getDeviceId', {
    value: () => __[key],
    writable: false,
  });

  Object.defineProperty(window, 'getCookie', {
    value: (name: string) => {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    writable: false,
  });

  Object.defineProperty(window, key, {
    value: (() => {
      // get cookie
      const funcName: string = 'getCookie' as string;
      if ((<any>window)[funcName]('uuId')) {
        return (<any>window)[funcName]('uuId');
      }

      // Public Domain/MIT
      let d = new Date().getTime(); //Timestamp
      let d2 =
        (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported

      const generate = () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          let r = Math.random() * 16; //random number between 0 and 16
          if (d > 0) {
            //Use timestamp until depleted
            // eslint-disable-next-line no-bitwise
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
          } else {
            //Use microseconds since page-load if supported
            // eslint-disable-next-line no-bitwise
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
          }
          // eslint-disable-next-line no-bitwise
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });

      let id = generate();

      if (id.length < 3) {
        id = generate();
      }

      return id;
    })(),
    writable: false,
  });
};

setUuId();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

declare global {
  interface Window {
    isTablet: boolean;
    isMobile: boolean;
    /**
     * get id generatet for the user session
     * */
    getUuId(): string;
    getDeviceId(): string;
    getCookie(name: string): string;
  }
  interface EventTarget {
    value: any;
  }
}
