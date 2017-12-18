import {Injectable} from "@angular/core";
import {Http, Headers, Jsonp} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs";
import {FlightRequestPayload, FlightSearchRequest, FlightSearchResponse} from "../searchRequest";


@Injectable()
export class TnsService {

  constructor(private http: Http, private _jsonp: Jsonp) {
  }


  public registerFlights(request: FlightRequestPayload) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`/api/register/user/flights`, request, {headers: headers});
  }

  public fetchFlightsLocal(request: FlightSearchRequest): Observable<FlightSearchResponse> {
    //"appId":"d434c40a","appKey":"9d17145a31f9c8eb15a34baea1d611b4"
    return this._jsonp.get("https://api.flightstats.com/flex/schedules/rest/v1/jsonp/from/" + request.origin + "/to/" + request.destination + "/departing/" + request.year + "/" + request.month + "/" + request.day + "?appId=d434c40a&appKey=9d17145a31f9c8eb15a34baea1d611b4&callback=JSONP_CALLBACK")
    .map(res => res.json());

  }


}
