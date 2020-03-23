import { CountryFilterPipe } from './shared/pipes/country-filter.pipe';
import { CountryPipe } from './shared/pipes/country.pipe';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { OperationPipe } from '@shared/pipes/operation.pipe';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DatePipe,
    CountryPipe,
    CountryFilterPipe,
    OperationPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule
  ]
})
export class AppModule { }
