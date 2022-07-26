import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class TranslateService {
  private readonly defaultTranslationSections = location.href.includes('auth.') ? [] : ['menu', 'global', 'user'];

  private defaultTranslations: any = {};

  private translations: any = {};

  private currentLang = 'de';

  constructor() {}

  public onInit() {
    for (const section of this.defaultTranslationSections) {
      this.loadAndSetTranslations(section, 'de', { isDefault: true });
    }
  }

  public translate(key: string): string | undefined {
    return this.translations[key] || this.defaultTranslations[key];
  }

  public setTranslations(section: string, values: any, lang?: string) {}

  public loadAndSetTranslations(section: string, lang: string = this.currentLang, options: any = {}) {
    return new Promise(resolve => {
      this.loadTranslations(section, lang)
          .pipe(catchError(
              err => {
                resolve(true)
                return of(null)
              }
          ))
          .subscribe((languages) => {
        if (options && options.isDefault) {
          Object.assign(this.defaultTranslations, languages);
        } else {
          this.translations = languages || {};
        }
        resolve(languages);
      });
    })
  }

  public loadTranslations: (section: string, lang: string) => Observable<any>;
}
