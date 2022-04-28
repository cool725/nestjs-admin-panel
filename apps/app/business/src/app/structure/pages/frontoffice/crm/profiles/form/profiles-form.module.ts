import {CommonModule} from "@angular/common";
import {ProfilesFormComponent} from "./profiles-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgModule} from "@angular/core";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ProfilesAPI} from "../packages/profile-api.service";
import {environment} from "../../../../../../../environments/environment";

@NgModule({
  declarations: [ ProfilesFormComponent],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        NzSelectModule,
    ],
  providers: [
   ProfilesAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesFormComponent],
  exports: [ProfilesFormComponent],
})
export class ProfilesFormModule {}
