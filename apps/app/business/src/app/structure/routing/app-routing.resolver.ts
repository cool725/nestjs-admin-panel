import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";

/**
 * This class handles the loading of language of an component
 *
 * */
@Injectable({
  providedIn:'root'
})
export class LocaleResolver implements Resolve<any> {
  static default ={
    locale:LocaleResolver
  }

  constructor(private translate: TranslateService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const {routeConfig} = route;
    const data = routeConfig?.data;
    const path = route?.url[0].path
    this.translate.setTranslation(
        this.translate.currentLang,
        this.translate.currentLoader.getTranslation(<any>{
          section:path,
          lang:this.translate.currentLang
        })
    )
    return this.loadLanguage(route);
  }

  /*
   * Load Languages from the given section
   * */
  loadLanguage(route: ActivatedRouteSnapshot): boolean {
    return true;
  }
}
