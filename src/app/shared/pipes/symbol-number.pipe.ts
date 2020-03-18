import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'symbolNumber'})
export class SymbolNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0) {
      return `+${value}`;
    }
    return value.toString();
  }
}
