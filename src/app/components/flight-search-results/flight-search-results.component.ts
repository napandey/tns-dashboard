import {Component, OnInit} from "@angular/core";
import {FSFlight, Flight} from "../../searchRequest";
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

  fsFlights: FSFlight[]


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
    var remove = false;
    if (!event.target.checked) {
      remove = true;
    }
    var found = false;
    var i = 0;
    for (i; i < this._dataService.getFlightsPayload().length; i++) {
      var currentFlight = this._dataService.getFlightsPayload()[i];
      if (currentFlight.airline == flight.carrierFsCode && currentFlight.flight_no == flight.flightNumber && currentFlight.origin == flight.departureAirportFsCode) {
        found = true;
        break;
      }
    }
    if (remove) {
      if (found) {
        this._dataService.deleteFlightFromPayload(i);
      }
    } else {
      if (!found) {
        var fsRegisterFlight: Flight = new Flight(flight.carrierFsCode, flight.arrivalTime,
          flight.departureTime, flight.arrivalAirportFsCode, flight.flightNumber, flight.departureAirportFsCode, false);
        this._dataService.addFlightToPayload(fsRegisterFlight);
      }
    }
  }

  registerFlights() {
    for (var i = 0; i < this._dataService.getFlightsPayload().length; i++) {
      var currentFlight = this._dataService.getFlightsPayload()[i];
      if (!currentFlight.processingDone) {
        var momentDate = momentTimeZone(currentFlight.departure_date);
        currentFlight.departure_date = momentDate.tz(this.getZoneFromAirportCode(currentFlight.origin)).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
        momentDate = momentTimeZone(currentFlight.arrival_date);
        currentFlight.arrival_date = momentDate.tz(this.getZoneFromAirportCode(currentFlight.destination)).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
        currentFlight.processingDone = true;
      }
    }
    this.tnsService.registerFlights(this._dataService.request).subscribe(
      (response) => {
        this._router.navigate(["/confirmation"]);
      },
      (err) => {
        alert(err);
        console.log(err);
      },
      () => {
        console.log("COMPLETED");
      }
    );
    ;
  }

  getZoneFromAirportCode(airportCode) {
    for (var i = 0; i < this._dataService.airports.length; i++) {
      var airport = this._dataService.airports[i];

      if (airport.fs == airportCode) {
        return airport.timeZoneRegionName;
      }

    }
    return "";
  }


}
