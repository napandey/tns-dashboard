import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {HttpClientJsonpModule} from "@angular/common/http";
import {DeviceDetailsComponent} from "./components/device-details/device-details.component";
import { AppRoutingModule } from './app-routing.module';
import {FlightSearchFormComponent} from "./components/flight-search-form/flight-search-form.component";
import {FlightSearchResultsComponent} from "./components/flight-search-results/flight-search-results.component";
import {FlightRegistrationConfirmationComponent} from "./components/flight-registration-confirmation/flight-registration-confirmation.component";
import {RegistrationRequestDataProviderService} from "./services/registration-request-data-provider.service";
import {TnsService} from "./services/tns.service";

@NgModule({
  declarations: [
    AppComponent,
    DeviceDetailsComponent,
    FlightSearchFormComponent,
    FlightSearchResultsComponent,
    FlightRegistrationConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientJsonpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [TnsService, RegistrationRequestDataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
