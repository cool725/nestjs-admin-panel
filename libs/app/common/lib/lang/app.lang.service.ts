import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class LangService {
  // keymap of global loaded translation
  private lang: any = {};

  // keymap of translation of current page
  // this should be released on ngDestroy
  private langPage: any = {};

  private currentLanguage = 'de';

  readonly languages: { name: string; enabled: boolean; languageId: number }[] =
    [
      { name: 'de', languageId: 1, enabled: true },
      { name: 'en', languageId: 2, enabled: true },
      { name: 'fr', languageId: 3, enabled: false },
      { name: 'it', languageId: 4, enabled: false },
      { name: 'br', languageId: 5, enabled: true },
      { name: 'es', languageId: 6, enabled: false },
      { name: 'ru', languageId: 7, enabled: false },
      { name: 'el', languageId: 8, enabled: false },
      { name: 'tr', languageId: 9, enabled: false },
      { name: 'th', languageId: 10, enabled: false },
    ];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: InjectionToken<string>) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public getCurrentLanguage() {
    return this.currentLanguage;
  }
  public getDefaultLanguageId() {
    return 1;
  }

  public getLangRoutePrefix() {
    return (
      '/' + (this.getCurrentLanguage() == 'de' ? '' : this.getCurrentLanguage())
    );
  }

  public changeLanguage(langName: string, emit = true) {
    this.currentLanguage = langName;
    this.languages.forEach((langObj) => {
      langObj.enabled = langObj.name === langName;
      return langObj;
    });

    //if (emit) this.on.emit({ action: 'languageChanged', value: langName });

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

@Injectable({ providedIn: 'root' })
export class LangServiceSSR extends LangService {
  useLocalStorage: boolean;

  private storagePrefix = 'lang_';

  constructor(
    @Inject(PLATFORM_ID) platformId: InjectionToken<string>,
    private serverState: TransferState
  ) {
    super(platformId);
  }

  public getLangFromCache(pageId: number, lang = this.getCurrentLanguage()) {
    const key: string = this.storagePrefix + pageId + '_' + lang;
    if (this.useLocalStorage) {
      return JSON.parse(<any>localStorage.getItem(key)) || {};
    } else {
      return this.serverState.get(makeStateKey(key), <any>{});
    }
  }
}
