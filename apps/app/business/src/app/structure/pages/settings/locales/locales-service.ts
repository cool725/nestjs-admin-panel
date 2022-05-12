import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LocalesService {
  constructor(private http: HttpClient) {
    this.test().subscribe();
  }

  getPath(path: string) {
    return environment.api.url + path;
  }

  getAllLang() {
    return this.http.get('/assets/locale-test/settings.json', {});
    //return this.http.get(this.getPath('/getText?all=1'), {});
  }

  test() {
    return this.http.get(this.getPath('/settings/locales/all'), {});
    //return this.http.get(this.getPath('/getText?all=1'), {});
  }

  setTranslation(
    key: string,
    translation: string,
    languageId: number,
    section: string
  ) {
    return this.http.put(this.getPath('/settings/locales/setText'), {
      key,
      translation: encodeURI(translation),
      languageId,
      section,
      isEncodeURI: true,
    });
  }

  updateTranslation(
    key: string,
    translation: string,
    languageId: number,
    section: string
  ) {
    return this.http.patch(
      this.getPath('/settings/locales/updateText/' + key),
      {
        translation: encodeURI(translation),
        languageId,
        section,
        isEncodeURI: true,
      }
    );
  }
}
