import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  modal: boolean = false;
  errorMessage: string = '';
  fade: boolean = false;

  constructor(private events: EventService) { }

  ngOnInit() {
    this.events.error.subscribe(message => {
      this.showErrorMessage(message);
    });
  }

  showErrorMessage(message: string){
    this.errorMessage = message;
    this.fade = true;
    this.fadeOut();
  }

  fadeOut() {
    setTimeout(()=> {
      this.fade = false;
    }, 5000);
  }

  openModal() {
    this.events.emitOpenModal();
  }

}
