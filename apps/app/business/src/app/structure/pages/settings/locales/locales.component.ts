import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Injector,
  OnInit,
} from '@angular/core';
import { LocalesService } from './locales-service';
import {PageController} from "../../page.controller";

const defaultLanguages = [
  'de',
  'en',
  'fr',
  'es',
  'it',
  'br',
 /*
   'ru',
  'el',
  'tr',
  'th',
 * */
];

@Component({
  selector: 'movit-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalesComponent extends PageController implements OnInit {
  allLang = defaultLanguages;
  allowSee = defaultLanguages;
  allowChange = defaultLanguages;

  colorize = ['de'];

  totalCounting: any[] = [];

  sections: string[] = [];
  allLanguagesSection: any = {};

  total = 0;

  canCreateLanguage = false;

  constructor(
    override injector: Injector,
    private cdr: ChangeDetectorRef,
    private langAPI: LocalesService
  ) {
    super(injector);

  }

  ngOnInit(): void {}

  getData() {
    //this.getCounting()
    // this.getPermissions();
    this.getLanguageValues();
  }

  getCounting() {}

  getLanguageValues() {
    const all = this.langAPI.getAllLang();

    all.subscribe((sectionObjects: any) => {
      this.sections = [];
      this.allLanguagesSection = sectionObjects;
      for (const sectionName in sectionObjects) {
        this.allLanguagesSection['total_' + sectionName] = 0;
        this.sections.push(sectionName);
        for (const key in sectionObjects[sectionName].de) {
          this.allLanguagesSection['total_' + sectionName] += 1;
          this.total += 1;
        }
      }
      this.updateView();
    });
  }

  getPermissions() {
    /*
    let d = this.userAPI.Settings().get.AvailLanguages().then((langs:any)=>{
      this.allLang      = langs.map(v=>v.lang.toLowerCase());
      this.allowSee     = langs.map(v=>v.lang.toLowerCase());
    });
    let b = this.userAPI.Settings().get.WriteLanguages( ).then(  (langs: any )=>{
      this.allowChange = langs.map(v=>v.lang.toLowerCase())
    });
    let c = this.userAPI.Settings().get.UserSettings  ( ).then(  (config:any )=>{
      if(config){
        this.showConfig = config.lang_mod.config
      }
    });
    * */
  }

  getPrecentOfLang(section: string, obj: any) {
    let i = 0;
    for (const key in obj) i += 1; // todo keymaps.length

    return (
      (100 / (this.allLanguagesSection['total_' + section] / i)).toFixed(2) +
      '%'
    );
    //  return (100 / (this.total / i) ).toFixed(2) + '%';
  }

  // Creating new LangObject
  createKey(key: string, text: string, langNameShort: string, section: string) {
    if (key && section /*this.allowEdit*/)
      this.langAPI
        .setTranslation(key, text, langNameShort, section)
        .subscribe(() => this.updateView());
  }

  async updateLanguageByKey(
    value: string,
    langNameShort: string,
    key: string,
    item: any,
    orginalItem: any
  ) {
    if (!item)
      return this.createKey(key, value, langNameShort, orginalItem.section);

    this.langAPI
      .updateTranslation(key, value, langNameShort, orginalItem.section)
      .subscribe(() => this.updateView());
  }

  updateView() {
    this.cdr.detectChanges();
  }
}
