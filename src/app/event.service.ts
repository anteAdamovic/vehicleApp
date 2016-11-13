import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
  addVehicle: EventEmitter<any> = new EventEmitter();
  search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  emitAddVehicle() {
    this.addVehicle.emit();
  }

  emitSearch(query: string) {
    this.search.emit(query);
  }

}
