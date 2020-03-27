import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'countryfilter',
})
export class CountryFilterPipe implements PipeTransform {
  transform(items: any[], country: string) {
    if (!items || !country) {
      return items;
    }
    const newItems = [...items];

    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return newItems.filter(item => item.country === country)[0];
  }
}
