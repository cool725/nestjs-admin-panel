import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private readonly documentIsAccessible: boolean = isPlatformBrowser(
    this.platformId
  );
  private token: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<any>
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.documentIsAccessible
      ? AppInterceptor.getCookie('utk', this.document)
      : '';
    if (!this.token) return next.handle(req);

    const headerObj: any = this.getHeader();

    const ctk = AppInterceptor.getCookie('ctk', this.document);
    if (ctk) {
      headerObj['Company'] =
        location.pathname.split('/')[1] +
        ':' +
        location.pathname.split('/')[2] +
        ` ` +
        ctk;
    }

    const reqClone = req.clone({
      headers: new HttpHeaders(headerObj),
    });

    return next.handle(reqClone);
  }

  private getHeader() {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
  }

  private addExtraHeaders(
    headers: HttpHeaders,
    values: { name: string; value: string }[]
  ): HttpHeaders {
    values.forEach((head) => (headers = headers.append(head.name, head.value)));
    return headers;
  }

  private static getCookie(name: string, document: Document): string {
    if (name) {
      name = encodeURIComponent(name);

      const regExp: RegExp = AppInterceptor.getCookieRegExp(name);
      const result: RegExpExecArray = <any>regExp.exec(document.cookie);
      return result && result[0] ? decodeURIComponent(result[1]) : '';
    } else {
      return '';
    }
  }

  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(
      /([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,
      '\\$1'
    );

    return new RegExp(
      '(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)',
      'g'
    );
  }
}
