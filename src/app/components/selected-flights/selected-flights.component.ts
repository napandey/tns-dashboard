import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Flight} from "../../searchRequest";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import * as momentTimeZone from "moment-timezone";

@Component({
  selector: 'app-selected-flights',
  templateUrl: './selected-flights.component.html',
  styleUrls: ['./selected-flights.component.css']
})
export class SelectedFlightsComponent implements OnInit {

  @Input()
  flights: Flight[]

  @Output() removeFlightEvent = new EventEmitter();

  constructor(private _dataService: RegistrationRequestDataProviderService) {
  }

  ngOnInit() {
  }

  getTime(time: string, flight: Flight, takeOff: number) {
    var momentDate = momentTimeZone(time);

    if (takeOff == 1) {
      return momentDate.format("hh:mm A") + " (" + flight.origin + ")";
    }
    return momentDate.format("hh:mm A") + " (" + flight.destination + ")";

  }

  removeFlight(flight: Flight) {
    for (var i = 0; i < this.flights.length; i++) {
      var currentFlight = this.flights[i];
      if (currentFlight.origin == flight.origin &&
        currentFlight.destination == flight.destination &&
        currentFlight.flight_no == flight.flight_no &&
        currentFlight.airline == flight.airline &&
        currentFlight.departure_date == flight.departure_date

      ) {
        this.flights.splice(i, 1);
        this._dataService.setFlightsPayload(this.flights);
      }
    }
  }
}
