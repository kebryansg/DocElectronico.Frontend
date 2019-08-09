import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], args?: any): any {
    // console.log(values);
    console.log(args);
    if (values && args)
      return values.filter(rows => rows.RUC.includes(args));
    else
      return values
  }

}
