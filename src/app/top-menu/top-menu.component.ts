import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  modal: boolean = false;

  constructor(private events: EventService) { }

  ngOnInit() {
  }

  openModal() {
    this.events.emitOpenModal();
  }

}
