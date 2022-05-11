import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalesService {
  constructor(private http: HttpClient) {}

  getPath(path: string) {
    return path;
  }

  getAllLang() {
    return this.http.get(this.getPath('/assets/locale-test/settings.json'), {});
    //return this.http.get(this.getPath('/getText?all=1'), {});
  }

  setTranslation(
    key: string,
    translation: string,
    lang: string,
    section: string
  ) {
    return this.http.post(this.getPath('/setText'), {
      key,
      translation: encodeURI(translation),
      lang,
      section,
      isEncodeURI: true,
    });
  }

  updateTranslation(
    key: string,
    translation: string,
    lang: string,
    section: string
  ) {
    return this.http.patch(this.getPath('/updateText/' + key), {
      translation: encodeURI(translation),
      lang,
      section,
      isEncodeURI: true,
    });
  }
}
