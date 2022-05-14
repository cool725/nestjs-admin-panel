import {Inject, ModuleWithProviders, NgModule} from "@angular/core";
import {TranslateService} from "./app.service.translate";
import {TranslatePipe} from "./app.pipe.translate";
import {LocaleResolver} from "./app.service.translate-resolver";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:[
      HttpClientModule
  ],
  providers: [
      TranslateService,
      LocaleResolver
  ],
  declarations:[
      TranslatePipe
  ],
  exports:[
      TranslatePipe,
  ]
})
export class TranslateLocaleModule {
    constructor(
        @Inject('TranslateLocaleLoader') translationLoader: any,
        private translateService:TranslateService) {
        this.defineLoader(translateService,translationLoader)
    }

    static forRoot(
        conf: { loader?:any }
    ): ModuleWithProviders<TranslateLocaleModule> {

        return {
            ngModule: TranslateLocaleModule,
            providers:[
                {provide:'TranslateLocaleLoader', useClass: conf.loader.useClass}
            ]
        }
    }

    static forChild(): ModuleWithProviders<TranslateLocaleModule> {
        return {
            ngModule: TranslateLocaleModule,

        }
    }

    defineLoader(translateService:TranslateService, useClass:any){
        Object.defineProperty(translateService,
            'loadTranslations', {
                value: useClass,
                writable: false
            });
    }
}