import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicles: Object[] = [];


  constructor(private http: HttpService) { }

  ngOnInit() {

    if( localStorage['vehicles'] ){
      this.getVehiclesFromLocalStorage();
      console.log('Vehicles found in local storage.');
    }
    else {
      this.http.getVehicles()
               .subscribe(
                 vehicles => this.store(vehicles)
               );
    }

  }

  private store(vehicles: any) {
    this.vehicles = vehicles;
    this.setVehiclesInLocalStorage();
  }

  private getVehiclesFromLocalStorage() {
    this.vehicles = JSON.parse(localStorage['vehicles']);
  }

  private setVehiclesInLocalStorage() {
    localStorage['vehicles'] = JSON.stringify(this.vehicles);
  }
}
