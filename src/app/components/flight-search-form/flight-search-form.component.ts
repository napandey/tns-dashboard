import {Component, OnInit} from "@angular/core";
import {FlightSearchRequest, FlightSearchResponse} from "../../searchRequest";
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

  constructor(private _dataService: RegistrationRequestDataProviderService, private _router: Router, private tnsService: TnsService) {

    this.search = new FlightSearchRequest("DEL", "SFO", "2018", "2", "1");

  }

  ngOnInit() {
  }

  fetchFlights(){
    this.tnsService.fetchFlightsLocal(this.search).subscribe(
      (response: FlightSearchResponse) => {
        this._dataService.setAirPorts(response.appendix.airports);

        this._dataService.setFlights(response.scheduledFlights);

        this._router.navigate(["/flightResults"]);

      },
      (err) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("COMPLETED");
      }
    );
  }

}
