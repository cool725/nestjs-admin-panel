import {CommonModule} from "@angular/common";
import {ProfilesSegmentFormComponent} from "./profiles-segment-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgModule} from "@angular/core";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ProfileSagmentAPI} from "../packages/profile-sagment-api.service";
import {environment} from "../../../../../../../environments/environment";

@NgModule({
  declarations: [ ProfilesSegmentFormComponent ],
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
  entryComponents: [ProfilesSegmentFormComponent],
  exports: [ProfilesSegmentFormComponent],
})
export class ProfilesSegmentFormModule {}
