import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    console.log(items);
    console.log(typeof args);
    args = args.toLowerCase();
    return items.filter(item => {
      return item.make.toLowerCase().includes(args) || item.model.toLowerCase().includes(args) || item.year.toString().toLowerCase().includes(args);
    });
  }

}
