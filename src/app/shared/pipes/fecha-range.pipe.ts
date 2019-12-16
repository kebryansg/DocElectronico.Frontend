import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fechaRange'
})
export class FechaRangePipe implements PipeTransform {

  transform(value: { FIni: string, FFin: string }, args?: any): any {
    if (!value) {
      return '';
    }
    return `${value.FIni} - ${value.FFin}`;
  }

}
