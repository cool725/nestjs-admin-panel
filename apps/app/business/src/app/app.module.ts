import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './structure/routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from '@movit/app/common';
import { environment } from '../environments/environment';
import {DataEmitter} from "@movit/app/common";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:'de'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: 'env', useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(dE:DataEmitter) {
  }
}
