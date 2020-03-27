import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'symbolNumber'})
export class SymbolNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      if (value > 0) {
        return `+${value}`;
      }
      if (value === 0) {
        return '';
      }
      return value.toString();
    }
    return null;
  }
}
