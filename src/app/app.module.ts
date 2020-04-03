import localeFr from '@angular/common/locales/fr';
import { LayoutModule } from './layout/layout.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, registerLocaleData, DecimalPipe } from '@angular/common';
registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DatePipe,
    DecimalPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule
  ]
})
export class AppModule { }
