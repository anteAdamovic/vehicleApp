import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'underscore';

import { HttpService } from '../http.service';
import { EventService } from '../event.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicles: Object[] = [];
  searchQuery: string = '';

  constructor(private http: HttpService, private events: EventService) { }

  ngOnInit() {

    if( localStorage['vehicles'] ){
      console.log('Vehicles found in local storage.');
      this.getVehiclesFromLocalStorage();
    }
    else {
      console.log('No vehicles found in local storage, fetching ...');
      this.http.getVehicles()
               .subscribe(
                 vehicles => {
                   this.vehicles = vehicles;
                   this.setVehiclesInLocalStorage();
                   console.log('Vehicles succesfully saved in local storage.');
                 }
               );
    }

    this.events.search.subscribe(query => {
      this.searchQuery = query;
      console.log('Query: ' + this.searchQuery);
    });

  }

  deleteVehicle(vehicle: any) {
    console.log('Deleting vehicle: ');
    console.log(vehicle);
    let index = this.vehicles.indexOf(vehicle);

    this.vehicles.splice(index, 1);
    console.log('Vehicle at index after deletion:');
    console.log(this.vehicles[index]);

    this.setVehiclesInLocalStorage();
    // let temp = [];
    // this.vehicles.forEach(vehicle => temp.push(vehicle));
    // this.vehicles = temp;
  }

  private getVehiclesFromLocalStorage() {
    this.vehicles = JSON.parse(localStorage['vehicles']);
  }

  private setVehiclesInLocalStorage() {
    localStorage['vehicles'] = JSON.stringify(this.vehicles);
  }
}
