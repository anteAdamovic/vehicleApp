import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'filter',
  pure: false // Declare a stateful pipe
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    args = args.toLowerCase();

    return items.filter(item => {
      return item.make.toLowerCase().includes(args) || item.model.toLowerCase().includes(args) || item.year.toString().toLowerCase().includes(args);
    });
  }

}
