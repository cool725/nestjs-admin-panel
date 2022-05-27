import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layout/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHttpInterceptor } from '@movit/app/common';
import { HTTPTranslateLoader, TranslateLocaleModule } from "@movit/app/module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    LayoutsModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
