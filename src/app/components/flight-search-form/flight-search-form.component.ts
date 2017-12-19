import {Component, OnInit} from "@angular/core";
import {FlightSearchRequest, FlightSearchResponse, FSFlight, Flight} from "../../searchRequest";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import {Router} from "@angular/router";
import {TnsService} from "../../services/tns.service";

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.css']
})
export class FlightSearchFormComponent implements OnInit {

  search: FlightSearchRequest

  flightSearchResponse: FlightSearchResponse

  flightsFromSearchResponse: FSFlight[]

  fetchingFlights: boolean

  selectedFlights: Flight[]


  constructor(private _dataService: RegistrationRequestDataProviderService, private _router: Router, private tnsService: TnsService) {

    this.search = new FlightSearchRequest("DEL", "SFO", new Date());
    this.flightsFromSearchResponse = [];
    this.fetchingFlights = false;
    this.selectedFlights = [];
  }

  ngOnInit() {
    this.fetchingFlights = false;
  }

  fetchFlights() {
    this.fetchingFlights = true;
    this.tnsService.fetchFlightsLocal(this.search).subscribe(
      (response: FlightSearchResponse) => {

        this.flightSearchResponse = response

        this._dataService.setAirPorts(response.appendix.airports);

        this._dataService.setFlights(response.scheduledFlights);

        this.flightsFromSearchResponse = response.scheduledFlights;


      },
      (err) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + err);
        this.fetchingFlights = false;
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("COMPLETED");
        this.fetchingFlights = false;
      }
    );
  }

  addFlight(flight: Flight) {
    for (var i = 0; i < this.selectedFlights.length; i++) {
      var currentFlight = this.selectedFlights[i];
      if (currentFlight.origin == flight.origin &&
        currentFlight.destination == flight.destination &&
        currentFlight.flight_no == flight.flight_no &&
        currentFlight.airline == flight.airline &&
        currentFlight.departure_date == flight.departure_date

      ) {
        return;
      }
    }
    this.selectedFlights.unshift(flight);
    this._dataService.setFlightsPayload(this.selectedFlights);
  }

  registerFlights() {
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

}
