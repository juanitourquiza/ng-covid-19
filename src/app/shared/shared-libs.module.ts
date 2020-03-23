import { CountryFilterPipe } from './pipes/country-filter.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPipe } from './pipes/loading.pipe';
import { SymbolNumberPipe } from './pipes/symbol-number.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { OperationPipe } from './pipes/operation.pipe';

@NgModule({
  declarations: [
    LoadingPipe,
    SymbolNumberPipe,
    CountryPipe,
    CountryFilterPipe,
    OperationPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingPipe,
    SymbolNumberPipe,
    CountryPipe,
    CountryFilterPipe,
    OperationPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedLibsModule { }
