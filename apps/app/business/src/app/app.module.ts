import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './structure/routing/app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from '@movit/app/common';
import { environment } from '../environments/environment';
import { HTTPTranslateLoader, TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateLocaleModule.forRoot({
      loader: {
        provide: 'TranslateLocaleLoader',
        useClass: HTTPTranslateLoader,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: 'env', useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
