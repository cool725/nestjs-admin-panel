import {CommonModule} from "@angular/common";
import {ProfilesSagmentFormComponent} from "./profiles-sagment-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgModule} from "@angular/core";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ProfileSagmentAPI} from "../packages/profile-sagment-api.service";
import {environment} from "../../../../../../../environments/environment";

@NgModule({
  declarations: [ ProfilesSagmentFormComponent],
  imports: [
        CommonModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        NzSelectModule,
    ],
  providers: [
    ProfileSagmentAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesSagmentFormComponent],
  exports: [ProfilesSagmentFormComponent],
})
export class ProfilesSagmentFormModule {}
