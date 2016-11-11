import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-operators';

import { AppComponent } from './app.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ContentComponent } from './content/content.component';

import { HttpService } from './http.service';
import { EventService } from './event.service';

@NgModule({
  declarations: [
    AppComponent,
    NewVehicleComponent,
    SearchComponent,
    ListComponent,
    ListItemComponent,
    TopMenuComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ HttpService, EventService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
