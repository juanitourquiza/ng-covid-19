import { CountryFilterPipe } from './pipes/country-filter.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPipe } from './pipes/loading.pipe';
import { SymbolNumberPipe } from './pipes/symbol-number.pipe';
import { CountryTranslationPipe } from './pipes/country-translation.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    LoadingPipe,
    SymbolNumberPipe,
    CountryTranslationPipe,
    CountryFilterPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPipe,
    SymbolNumberPipe,
    CountryTranslationPipe,
    CountryFilterPipe,
    NgxMatSelectSearchModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class SharedLibsModule { }
