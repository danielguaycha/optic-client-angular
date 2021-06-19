import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: any, places: number = 2): unknown {
    if (!value) return '0';
    return this.roundTo(value, places);
  }

  roundTo(number:any, places:number = 6){
    if (typeof number === 'string') {
      return Number.parseFloat(number).toFixed(places);
    }
    return number.toFixed(places);
  }
}
