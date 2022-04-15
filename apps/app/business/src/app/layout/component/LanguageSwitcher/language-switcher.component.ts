import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as SettingsActions from 'src/app/store/layout/settings/actions';
import * as Reducers from 'src/app/store/layout/reducers';
import { LangService } from '../../../../services/locales/lang.service';
import { UserStore } from '../../../../store/data/User.Store';
import { UserAPI } from '../../../../services/api/user-provider/user-provider';

@Component({
  selector: 'cui-topbar-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class TopbarLanguageSwitcherComponent {
  language: string;
  languages = this.lang.languages;

  constructor(
    public lang: LangService,
    public usrAPI: UserAPI,
    public user: UserStore,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe((state: any) => {
      this.language = state.locale.substr(0, 2);
      this.languages = this.lang.languages;
      if (this.lang.languages.length == 0) {
        this.lang.languages = JSON.parse(
          localStorage.getItem('cSettings')
        ).languages;
        this.languages = this.lang.languages;
      }
    });
  }

  changeLanguage(locale, id) {
    if (locale && id) {
      locale = locale.toLowerCase();
      if (
        this.lang.changeLanguage(locale) &&
        id &&
        this.lang.getCurrentLang()
      ) {
        this.usrAPI.Settings().set.Language(id);
        this.store.dispatch(
          new SettingsActions.SetStateAction({
            locale,
          })
        );
        console.info('Language is set to:', this.lang.getCurrentLang(), id);
      }
    }
  }
}
