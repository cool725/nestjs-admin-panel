import {ModuleWithProviders, NgModule} from "@angular/core";
import {TranslateService} from "./app.service.translate";
import {TranslatePipe} from "./app.pipe.translate";
import {LocaleResolver} from "./app.service.translate-resolver";

@NgModule({
  providers:[
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
    constructor(private translateService:TranslateService) {}

    static forRoot({loader}:{loader:any}): ModuleWithProviders<TranslateLocaleModule> {
        return {
            ngModule: TranslateLocaleModule,
        }
    }
    static forChild(): ModuleWithProviders<TranslateLocaleModule> {
        return {
            ngModule: TranslateLocaleModule,

        }
    }
}