import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LangResolver } from './app-routing.resolver';

import { LayoutsModule } from '../../layout/layouts.module';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, LayoutsModule],
  providers: [LangResolver],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
