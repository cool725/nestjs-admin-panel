import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class HTTPTranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(section: string, lang: string): Observable<any> {
    return this.http.get(
      '/assets/locale/' + lang + '/' + `${lang}.${section}.locale.json`
    );
  }
}
