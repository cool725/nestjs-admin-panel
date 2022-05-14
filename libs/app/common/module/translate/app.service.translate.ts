import { Injectable } from '@angular/core';
import { HTTPTranslateLoader } from '@movit/app/module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly defaultTranslationSections = ['menu', 'global', 'user'];

  private defaultTranslations: any = {};

  private translations: any = {};

  private currentLang = 'de';

  constructor() {}

  public onInit() {
    for (let section of this.defaultTranslationSections) {
      this.loadAndSetTranslations(section, 'de', { isDefault: true });
    }
  }

  public translate(key: string): string | undefined {
    return this.translations[key] || this.defaultTranslations[key];
  }

  public setTranslations(section: string, values: any, lang?: string) {}

  public loadAndSetTranslations(
    section: string,
    lang: string = this.currentLang,
    options: any = {}
  ) {
    this.loadTranslations(section, lang).subscribe((languages) => {
      if (options && options.isDefault) {
        Object.assign(this.defaultTranslations, languages);
      } else {
        this.translations = languages;
      }
    });
  }

  public loadTranslations: (section: string, lang: string) => Observable<any>;
}
