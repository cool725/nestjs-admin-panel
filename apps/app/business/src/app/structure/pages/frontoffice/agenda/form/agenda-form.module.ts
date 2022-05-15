import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaFormComponent } from './agenda-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLocaleModule} from "@movit/app/module";
import {MdbSharedModule} from "@movit/app/ui";
import {environment} from "../../../../../../environments/environment";
import {AgendaAPI} from "../packages/agenda-api.service";

@NgModule({
  declarations: [AgendaFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateLocaleModule, MdbSharedModule],
  entryComponents: [AgendaFormComponent],
  providers:[
      AgendaAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice'].join('/'),
    },
  ]
})
export class AgendaFormModule {}
