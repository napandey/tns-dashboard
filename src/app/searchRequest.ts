export class FlightRequestPayload {
  constructor(public user: User,
              public courier: Courier,
              public flights: Flight[]

  ) {

  }
}


export class FlightSearchRequest {
  constructor(public origin: string,
              public destination: string,
              public year: string,
              public month: string,
              public day: string

  ) {

  }
}
/*
 "SFO"
 arrivalTerminal
 :
 "I"
 arrivalTime
 :
 "2018-02-01T06:00:00.000"
 carrierFsCode
 :
 "AI"
 codeshares
 :
 []
 departureAirportFsCode
 :
 "DEL"
 departureTerminal
 :
 "3"
 departureTime
 :
 "2018-02-01T04:00:00.000"
 flightEquipmentIataCode
 :
 "77L"
 flightNumber
 :
 "173"
 isCodeshare
 :
 false
 isWetlease
 :
 false
 referenceCode
 :
 "338-1024090--"
 serviceClasses
 :
 (3) ["F", "J", "Y"]
 serviceType
 :
 "J"
 stops
 :
 0
 */

export class FlightSearchResponse {
  constructor(public scheduledFlights: FSFlight[],
              public appendix: Appendix,
  ) {

  }
}

export class Appendix {
  constructor(
              public airports: Airport[],
  ) {

  }
}

export class Airport {
  constructor(public fs: string,
              public timeZoneRegionName: Airport[],
  ) {

  }
}

export class FSFlight {
  constructor(public arrivalAirportFsCode: string,
              public departureAirportFsCode: string,
              public departureTime: string,
              public flightNumber: string,
              public carrierFsCode:string,
              public arrivalTime:string

  ) {

  }
}

/*
 "expuserid": "1871580",
 "guid": "763d6d1a-8aec-4098-9789-85ce59ace348",
 "siteid": "1",
 "tuid": "9714196"
 */

export class User {
  constructor(
    public expuserid: string,
    public guid: string,
    public siteid: string,
    public tuid: string

  ) {

  }
}


export class Courier {
  constructor(
    public group: string,
    public langid: string,
    public name: string,
    public token: string,
    public uniqueIdentifier: string,

  ) {

  }
}


export class Flight {
  constructor(
    public airline: string,
    public arrival_date: string,
    public departure_date: string,
    public destination: string,
    public flight_no: string,
    public origin: string,
    public processingDone:boolean

  ) {

  }
}
