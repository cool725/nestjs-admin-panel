import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Date.prototype.asSql = function (t = false) {
  const y = this.getFullYear();
  const m =
    this.getMonth() + 1 < 10
      ? '0' + '' + (this.getMonth() + 1)
      : this.getMonth() + 1;
  const d = this.getDate() < 10 ? '0' + '' + this.getDate() : this.getDate();
  const h = this.getHours() < 10 ? '0' + '' + this.getHours() : this.getHours();
  const mi =
    this.getMinutes() < 10 ? '0' + '' + this.getMinutes() : this.getMinutes();

  if (t) {
    return `${y}-${m}-${d}T` + h + ':' + mi;
  }

  return `${y}-${m}-${d}`; //`${h}:${m}`
};

Date.prototype.format = function (format) {
  const y = this.getFullYear() + '';
  const m =
    this.getMonth() + 1 < 10
      ? '0' + '' + (this.getMonth() + 1)
      : this.getMonth() + 1;
  const d = this.getDate() < 10 ? '0' + '' + this.getDate() : this.getDate();
  const h = this.getHours() < 10 ? '0' + '' + this.getHours() : this.getHours();
  const mi =
    this.getMinutes() < 10 ? '0' + '' + this.getMinutes() : this.getMinutes();

  return format
    .replace('YY', y.slice(2))
    .replace('MM', <any>m)
    .replace('DD', <any>d);
};

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 *
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
Date.prototype.dateAdd = function (interval, units): any {
  let ret = new Date(this); //don't change original date

  const checkRollover = () => {
    if (ret.getDate() != this.getDate()) ret.setDate(0);
  };

  switch (String(interval).toLowerCase()) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + units);
      checkRollover();
      break;
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * units);
      checkRollover();
      break;
    case 'month':
      ret.setMonth(ret.getMonth() + units);
      checkRollover();
      break;
    case 'week':
      ret.setDate(ret.getDate() + 7 * units);
      break;
    case 'day':
      ret.setDate(ret.getDate() + units);
      break;
    case 'hour':
      ret.setTime(ret.getTime() + units * 3600000);
      break;
    case 'minute':
      ret.setTime(ret.getTime() + units * 60000);
      break;
    case 'second':
      ret.setTime(ret.getTime() + units * 1000);
      break;
    default:
      ret = undefined;
      break;
  }
  return ret;
};

declare global {
  interface Date {
    asSql(t?: boolean): string;
    format(format?: string): string;
    dateAdd(interval, units): Date;
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
