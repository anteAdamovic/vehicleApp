import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
  openModal: EventEmitter<any> = new EventEmitter();
  search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  emitOpenModal() {
    this.openModal.emit();
  }

  emitSearch(query: string) {
    this.search.emit(query);
  }

}
