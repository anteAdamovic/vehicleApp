import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';

  constructor(private events: EventService) { }

  ngOnInit() {
  }

  updateQuery() {
    this.events.emitSearch(this.query);
  }

}
