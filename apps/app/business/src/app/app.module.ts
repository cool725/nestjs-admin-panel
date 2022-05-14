import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './structure/routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from '@movit/app/common';
import { environment } from '../environments/environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Observable, of} from "rxjs";


class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    console.log(lang)
    return of({KEY: 'value'});
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {provide: TranslateLoader, useClass: CustomLoader}
    }),
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: 'env', useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
