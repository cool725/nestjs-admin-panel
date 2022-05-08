import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgendaFormComponent} from "./agenda-form.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
      AgendaFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    AgendaFormComponent
  ]
})
export class AgendaFormModule { }
