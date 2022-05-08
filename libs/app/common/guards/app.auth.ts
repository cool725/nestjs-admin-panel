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
import { UserStore } from '../store/app.store.user';

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
      private userStore: UserStore,
      private router: Router,
      @Inject('env')
      @Optional()
      public env?: {
        auth?: { redirectOnFailure: boolean };
        api: { url: string };
        company: any;
      }
    ) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (
        this.env?.auth?.redirectOnFailure &&
        !this.document.cookie.includes('utk')
      ) {
        console.warn('utk missing');
        console.warn(this.document.cookie);
        console.warn(document.cookie);
        navigateToAuthPage(document);
        return false;
      }
      return this.userStore.reloadUser();
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
      public env?: {
        auth?: { redirectOnFailure: boolean };
        api: { url: string };
        company: any;
      }
    ) {}

    canActivate():
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (!this.env) return false;
      if (this.env?.auth?.redirectOnFailure === false) return true;
      return true;
      return this.http.get(this.env?.api?.url + '/company').pipe(
        tap((company) => ((<any>this.env).company = company)),
        map((company: any) => {
          const isValid = !!(company && company.businessUuId);
          if (!isValid) navigateToAuthPage(this.document);
          return isValid;
        }),
        catchError((error) => {
          console.error(error);
          navigateToAuthPage(this.document);
          return of(false);
        })
      );
    }
  }
}
