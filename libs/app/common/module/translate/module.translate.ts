import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateService } from './app.service.translate';
import { TranslatePipe } from './app.pipe.translate';
import { LocaleResolver } from './app.service.translate-resolver';
import { HTTPTranslateLoader } from './app.loader.translate';

@NgModule({
  imports: [
    /*HttpClientModule*/
  ],
  providers: [TranslateService, LocaleResolver],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslateLocaleModule {
  constructor(
    @Inject('TranslateLocaleLoader')
    private translationLoader: HTTPTranslateLoader,
    private translateService: TranslateService
  ) {
    this.defineLoader();
    this.onInit();
  }

  static forRoot(conf: {
    loader?: any;
  }): ModuleWithProviders<TranslateLocaleModule> {
    return {
      ngModule: TranslateLocaleModule,
      providers: [
        { provide: 'TranslateLocaleLoader', useClass: conf.loader.useClass },
      ],
    };
  }

  static forChild(): ModuleWithProviders<TranslateLocaleModule> {
    return {
      ngModule: TranslateLocaleModule,
    };
  }

  private defineLoader() {
    this.translateService.loadTranslations = (section: string, lang: string) =>
      this.translationLoader.getTranslation(section, lang);
  }

  private onInit() {
    this.translateService.onInit();
  }
}
