import {Component, OnInit} from "@angular/core";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import {Router} from "@angular/router";
import {FlightSearchRequest} from "../../searchRequest";

@Component({
  selector: 'app-flight-registration-confirmation',
  templateUrl: './flight-registration-confirmation.component.html',
  styleUrls: ['./flight-registration-confirmation.component.css']
})
export class FlightRegistrationConfirmationComponent implements OnInit {

  search: FlightSearchRequest

  constructor(private _dataService: RegistrationRequestDataProviderService, private _router: Router) { }

  ngOnInit() {
  }

}
