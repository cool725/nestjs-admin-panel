import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthCanActivate {
  const authPageIsExternal = () => true;

  export const navigateToAuthPage = (document: Document) =>
    authPageIsExternal()
      ? (document.location = `${location.protocol}//auth.${(() => {
          const url = location.host.split('.');
          url.shift();
          return url.join('.');
        })()}`)
      : null;

  @Injectable()
  export class hasUserAccess implements CanActivate {
    constructor(
      @Inject(DOCUMENT) private document: Document,
      @Inject(PLATFORM_ID) private platformId: InjectionToken<string>,
      private router: Router
    ) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (!this.document.cookie.includes('utk')) {
        console.warn('utk missing');
        console.warn(this.document.cookie);
        console.warn(document.cookie);
        navigateToAuthPage(document);
        return false;
      }
      return true;
    }
  }

  @Injectable()
  export class hasCompanyAccess implements CanActivate {
    constructor(
      private http: HttpClient,
      @Inject(DOCUMENT) private document: Document,
      @Inject(PLATFORM_ID) private platformId: InjectionToken<string>,
      @Inject('env')
      @Optional()
      public env?: { api: { url: string }; company: any }
    ) {}

    canActivate():
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (!this.env) return false;
      return this.http.get(this.env.api.url + '/company').pipe(
        tap((company) => ((<any>this.env).company = company)),
        map((company: any) => {
          const isValid = !!(company && company.businessUuId);
          console.warn('not valid 1 ');
          if (!isValid) navigateToAuthPage(this.document);
          return isValid;
        }),
        catchError((error) => {
          console.error(error);
          console.warn('not valid 2 ');
          navigateToAuthPage(this.document);
          return of(false);
        })
      );
    }
  }
}
