import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

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
  savedSearchQuery: string = '';
  order: string = null;
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
    this.events.openModal.subscribe(event => {
      this.newVehicleModal = true;
      this.savedSearchQuery = this.searchQuery;
      this.searchQuery = '';
      this.order = '';
    });

  }

  addVehicle(vehicle: any){
    if(!this.vehicleExists(vehicle)){
      this.vehicles.push(vehicle);
      this.setVehiclesInLocalStorage();
    }
    else
      this.displayErrorMessage('Vehicle already exists!');

    this.searchQuery = this.savedSearchQuery;
    this.order = null;
  }

  deleteVehicle(vehicle: any) {
    // TODO Add component to handle user prompt
    // let vehicleString = 'Make: ' + vehicle.make + ' , Model: ' + vehicle.model + ', Year: ' + vehicle.year;
    // if(prompt('Are you sure you want to delete this vehicle ?', vehicleString) == null) return;
    let index = this.vehicles.indexOf(vehicle);

    this.vehicles.splice(index, 1);
    this.setVehiclesInLocalStorage();
  }

  closeModal() {
    this.newVehicleModal = false;
    this.searchQuery = this.savedSearchQuery;
    this.order = null;
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
    this.events.emitError(message);
  }

  private getVehiclesFromLocalStorage() {
    this.vehicles = JSON.parse(localStorage['vehicles']);
  }

  private setVehiclesInLocalStorage() {
    localStorage['vehicles'] = JSON.stringify(this.vehicles);
  }
}
