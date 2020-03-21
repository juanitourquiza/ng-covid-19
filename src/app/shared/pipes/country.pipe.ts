import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Pipe({
  name: 'country',
})
export class CountryPipe implements PipeTransform {
  transform(val: string) {
    const countries = {
      US: 'USA',
      'Korea, South': 'S. Korea',
      'United Kingdom': 'UK',
      'Taiwan*': 'Taiwan',
      'United Arab Emirates': 'UAE',
      'Bahamas, The' : 'Bahamas',
      'Cruise Ship': 'Diamond Princess',
      'Cote d\'Ivoire' : 'Ivory Coast',
      'occupied Palestinian territory' : 'Palestine',
      'Republic of the Congo' : 'Congo'
    };
    if (!countries[val]) {
      return val;
    }
    return (countries[val]);
  }
}
