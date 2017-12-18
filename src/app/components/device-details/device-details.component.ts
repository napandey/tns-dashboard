import {Component, OnInit} from "@angular/core";
import {Courier} from "../../searchRequest";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  private courier: Courier;

  constructor(private dataService: RegistrationRequestDataProviderService, private _router: Router) {
    this.courier = new Courier("apns", "1033", "com.expedia.bookings", "please enter your token", "token");
  }

  ngOnInit() {
  }

  handleClick() {
    this.dataService.setCourier(this.courier);
    this._router.navigate(['/flightSearch']);

  }

}
