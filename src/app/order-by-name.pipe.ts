import { Pipe, PipeTransform, Injectable } from '@angular/core';

import { Vehicle } from './vehicle';

@Pipe({
  name: 'orderByName',
  pure: false
})

@Injectable()
export class OrderByNamePipe implements PipeTransform {

  transform(vehicles: any, args?: any): any {
    return vehicles.sort(this.compare);
  }

  compare(a: Vehicle, b: Vehicle){
    if(a.make > b.make)
      return 1;
    else if(a.make < b.make)
      return -1;
    else
      return 0;
  }

}
