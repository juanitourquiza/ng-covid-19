import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'operation',
})
export class OperationPipe implements PipeTransform {
  transform(number1: number, number2: number, sign: string) {
    if (sign === '+') {
      return (number1 + number2);
    }
    if (sign === '-') {
      return (number1 - number2);
    }
  }
}
