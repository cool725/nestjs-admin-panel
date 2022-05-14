import {ModuleWithProviders, NgModule} from "@angular/core";
import {TranslateService} from "./app.service.translate";
import {TranslatePipe} from "./app.pipe.translate";

@NgModule({
  providers:[
      TranslateService,
  ],
  declarations:[
      TranslatePipe
  ],
  exports:[
      TranslatePipe
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