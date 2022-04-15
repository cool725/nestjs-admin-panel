import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';

/**
 * This class handles the loading of language of an component
 *
 * */
@Injectable({ providedIn: 'root' })
export class LangResolver implements Resolve<any> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.loadLanguage(route);
  }

  /*
   * Load Languages from the given section
   * */
  loadLanguage(route: ActivatedRouteSnapshot): boolean {
    return true;
  }
}
