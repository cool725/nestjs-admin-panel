import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from './app.service.translate';

/**
 * This class handles the loading of language of an component
 *
 * */
@Injectable({
  providedIn: 'root',
})
export class LocaleResolver implements Resolve<any> {
  static default = {
    locale: LocaleResolver,
  };

  constructor(private ts: TranslateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { routeConfig } = route;
    const data:any = routeConfig?.data;
    const path = route?.url[0].path;
    return this.ts.loadAndSetTranslations(data?.path || path);
  }
}
