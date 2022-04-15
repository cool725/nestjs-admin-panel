import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LangService {
  // keymap of global loaded translation
  private lang: any = {};

  // keymap of translation of current page
  // this should be released on ngDestroy
  private langPage: any = {};

  private currentLanguage = 'de';

  readonly languages: { name: string; enabled: boolean }[] = [];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: InjectionToken<string>) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public getCurrentLanguage() {
    return this.currentLanguage;
  }

  public changeLanguage(langName: string, emit = true) {
    this.currentLanguage = langName;
    this.languages.forEach((langObj) => {
      langObj.enabled = langObj.name === langName;
      return langObj;
    });
    this.saveLanguageSelectionLocal(langName);
  }

  public injectLangObj(obj: any) {
    this.langPage = obj[this.currentLanguage];
  }

  public translate(
    key: string,
    section: string,
    tArgs: any[] = [],
    fallback: string = key
  ) {
    return section === 'page'
      ? this.langPage[key] || fallback
      : this.lang[section][key] || fallback;
  }

  private saveLanguageSelectionLocal(langName: string) {
    if (this.isBrowser) {
      localStorage.setItem('lang', langName);
      ((cname, cvalue) => {
        const d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
      })('lang', langName);
    }
  }
}
