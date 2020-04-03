import { COUNTRIES_DICTIONARY } from './../../coronavirus/constants/country-dictionary.constants';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryTranslation',
})
export class CountryTranslationPipe implements PipeTransform {
  transform(val: any) {
    if (!COUNTRIES_DICTIONARY[val.code]) {
      return val.country;
    }
    return (COUNTRIES_DICTIONARY[val.code]);
  }
}
