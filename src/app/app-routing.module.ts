import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeviceDetailsComponent} from "./components/device-details/device-details.component";
import {FlightSearchFormComponent} from "./components/flight-search-form/flight-search-form.component";
import {FlightSearchResultsComponent} from "./components/flight-search-results/flight-search-results.component";
import {FlightRegistrationConfirmationComponent} from "./components/flight-registration-confirmation/flight-registration-confirmation.component";

const routes: Routes = [
  { path: 'home', component: DeviceDetailsComponent },
  { path: '', component: DeviceDetailsComponent } ,
  { path: 'flightSearch', component: FlightSearchFormComponent },
  { path: 'flightResults', component: FlightSearchResultsComponent },
  { path: 'confirmation', component: FlightRegistrationConfirmationComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
