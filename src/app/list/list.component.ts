import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'underscore';

import { HttpService } from '../http.service';
import { EventService } from '../event.service';
import { FilterPipe } from '../filter.pipe';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  searchQuery: string = '';
  newVehicleModal: boolean = false;

  constructor(private http: HttpService, private events: EventService) { }

  ngOnInit() {

    if( localStorage['vehicles'] ){
      this.getVehiclesFromLocalStorage();
    }
    else {
      this.http.getVehicles()
               .subscribe(
                 vehicles => {
                   this.vehicles = vehicles;
                   this.setVehiclesInLocalStorage();
                 }
               );
    }

    this.events.search.subscribe(query => this.searchQuery = query);
    this.events.openModal.subscribe(event => this.newVehicleModal = true);

  }

  addVehicle(vehicle: any){
    if(!this.vehicleExists(vehicle)){
      this.vehicles.push(vehicle);
      this.setVehiclesInLocalStorage();
    }
    else
      this.displayErrorMessage('Vehicle already exists!');

  }

  deleteVehicle(vehicle: any) {
    let index = this.vehicles.indexOf(vehicle);

    this.vehicles.splice(index, 1);
    this.setVehiclesInLocalStorage();
  }

  vehicleExists(vehicle: Vehicle): boolean {
    for(var x = 0; x < this.vehicles.length; x++){
      let v = this.vehicles[x];
      if(v.make == vehicle.make && v.model == vehicle.model && (v.year == vehicle.year || (v.year == null && isNaN(vehicle.year))))
        return true;
    }

    return false;
  }

  displayErrorMessage(message: string) {
    console.error(message);
    console.log('Error: ', message);
  }

  private getVehiclesFromLocalStorage() {
    this.vehicles = JSON.parse(localStorage['vehicles']);
  }

  private setVehiclesInLocalStorage() {
    localStorage['vehicles'] = JSON.stringify(this.vehicles);
  }
}
