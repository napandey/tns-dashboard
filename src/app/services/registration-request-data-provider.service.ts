import {Injectable} from "@angular/core";
import {FlightRequestPayload, Courier, User, Airport, FSFlight, Flight} from "../searchRequest";

@Injectable()
export class RegistrationRequestDataProviderService {

  get searchedFlights(): FSFlight[] {
    return this._searchedFlights;
  }

  get request(): FlightRequestPayload {
    return this._request;
  }

  set request(value: FlightRequestPayload) {
    this._request = value;
  }

  private _request: FlightRequestPayload

  airports: Airport[]

  private _searchedFlights: FSFlight[]

  constructor() {
    var user = new User("1871580", "763d6d1a-8aec-4098-9789-85ce59ace348", "1", "0");
    this._request = new FlightRequestPayload(user, null, []);
  }

  setCourier(courier: Courier) {
    this._request.courier = courier;
  }

  setAirPorts(airports: Airport[]) {
    this.airports = airports;
  }

  setFlights(scheduledFlights: FSFlight[]) {
    this._searchedFlights = scheduledFlights;
  }

  getFlightsPayload() {
    return this._request.flights;
  }

  deleteFlightFromPayload(i: number) {
    this._request.flights.splice(i, 1);
  }

  clearFlightsPayload() {
    this._request.flights = [];
  }

  addFlightToPayload(fsRegisterFlight: Flight) {
    this._request.flights.push(fsRegisterFlight);
  }
}
