import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {FSFlight, Flight, Airport} from "../../searchRequest";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import {Router} from "@angular/router";
import * as momentTimeZone from "moment-timezone";
import {TnsService} from "../../services/tns.service";

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit {

  @Input()
  fsFlights: FSFlight[]

  @Input()
  airports: Airport[]

  @Output() selectFlightEvent = new EventEmitter();


  constructor(private _dataService: RegistrationRequestDataProviderService, private _router: Router, private tnsService: TnsService) {
    this.fsFlights = _dataService.searchedFlights;

  }

  ngOnInit() {
    this._dataService.clearFlightsPayload();
    this.fsFlights = this._dataService.searchedFlights;
  }


  getTime(time: string, flight: FSFlight, takeOff: number) {
    var momentDate = momentTimeZone(time);

    if (takeOff == 1) {
      return momentDate.format("hh:mm A") + " (" + flight.departureAirportFsCode + ")";
    }
    return momentDate.format("hh:mm A") + " (" + flight.arrivalAirportFsCode + ")";

  }

  selectFlight(event, flight: FSFlight) {
    var add = false;
    if (event.target.checked) {
      add = true;
    }
    if (add) {
      var momentDate = momentTimeZone(flight.departureTime);
      var depDate = momentDate.tz(this.getZoneFromAirportCode(flight.departureAirportFsCode))._i + momentDate.tz(this.getZoneFromAirportCode(flight.departureAirportFsCode)).format("ZZ");
      momentDate = momentTimeZone(flight.arrivalTime);
      var arrival_date = momentDate.tz(this.getZoneFromAirportCode(flight.arrivalAirportFsCode))._i + momentDate.tz(this.getZoneFromAirportCode(flight.arrivalAirportFsCode)).format("ZZ");

      var fsRegisterFlight: Flight = new Flight(flight.carrierFsCode, arrival_date,
        depDate, flight.arrivalAirportFsCode, flight.flightNumber, flight.departureAirportFsCode);
      this.selectFlightEvent.emit(fsRegisterFlight);
    }
  }


  getZoneFromAirportCode(airportCode) {
    for (var i = 0; i < this.airports.length; i++) {
      var airport = this.airports[i];

      if (airport.fs == airportCode) {
        return airport.timeZoneRegionName;
      }

    }
    return "";
  }
}
