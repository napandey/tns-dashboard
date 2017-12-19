import {Component, OnInit} from "@angular/core";
import {Courier, User} from "../../searchRequest";
import {RegistrationRequestDataProviderService} from "../../services/registration-request-data-provider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  private courier: Courier;

  private user:User;

  constructor(private dataService: RegistrationRequestDataProviderService, private _router: Router) {
    this.courier = new Courier("apns", "1033", "com.expedia.bookings", "please enter your token", "token");
    this.user = new User("1871580", "763d6d1a-8aec-4098-9789-85ce59ace348", "1", "0");
  }

  ngOnInit() {
  }

  handleClick() {
    this.dataService.setCourier(this.courier);
    this.dataService.setUser(this.user);
    this._router.navigate(['/flightSearch']);
  }

}
