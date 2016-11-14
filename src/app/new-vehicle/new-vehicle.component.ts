import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewVehicleComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  make: string = '';
  model: string = '';
  year: string = '';

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }

  createVehicle() {
    let newVehicle = {
      make: this.make,
      model: this.model,
      year: this.year.length == 0 ? 0 : parseInt(this.year)
    };
    this.create.emit(newVehicle);
    this.closeModal();
  }

}
