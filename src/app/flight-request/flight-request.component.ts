import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Broker } from '../../model/broker';
import { FlightRequest } from '../../model/flight-request';
import { FlightRequestStatus } from '../../model/flight-request-status.enum';
import { FlightLeg } from '../../model/flight-leg';
import { SalesPerson } from '../../model/sales-person';

import { FlightRequestService } from '../../services/flight-request.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'flight-request',
  templateUrl: './flight-request.component.html',
  styleUrls: ['./flight-request.component.css']
})
export class FlightRequestComponent implements OnInit {

  currentUser: SalesPerson;

  brokers: Broker[] = [];
  flightRevenueTypes: string[] = [];

  displayedColumns: string[] = ['date', 'from', 'to', 'type', 'remove'];
  request: FlightRequest;
  requestStatus: string;

  flightDate: Date = new Date(2019, 3, 20);
  flightFrom: String = "AYT";
  flightTo: String = "SAW";
  flightRevenue: String = "Live";
  flightLegsDS = new MatTableDataSource<FlightLeg>();
  flightBroker: String = "";


  constructor(
    public flightService: FlightRequestService,
    public userService: UserService,
    private router: Router) {
    this.request = new FlightRequest(userService)
  }

  ngOnInit() {
    this.flightService.getBrokers()
      .subscribe(actionArray => {
        console.log("actionArray:", actionArray)
        this.brokers = actionArray.map(val => {
          console.log("val: ", val)
          const obj = { key: val.payload.doc.id, ...val.payload.doc.data() }
          console.log("obj: ", obj)
          return obj
        })
      })


    this.flightRevenueTypes = ['Ferry', 'Live'];

    // this.request = {
    //   status: FlightRequestStatus['New'],
    //   createdBy: this.currentUser,
    //   createdDate: (new Date()).toLocaleString(),
    //   flights: []
    // } as FlightRequest
  }

  addFlightLeg() {
    const flightLeg = {
      date: this.flightDate.toLocaleString(),
      from: this.flightFrom,
      to: this.flightTo,
      type: this.flightRevenue,
      fromRef: '/IATACodeList/' + this.flightFrom,
      toRef: '/IATACodeList/' + this.flightTo,
    } as FlightLeg
    this.request.flights.push(flightLeg);
    this.flightLegsDS.data = this.request.flights;
    this.changeFromTo()
  }

  private changeFromTo() {
    const lastIdx = this.request.flights.length - 1

    this.flightFrom = this.request.flights[lastIdx].to
    this.flightTo = lastIdx > 0
      ? this.request.flights[0].from
      : this.request.flights[lastIdx].from
  }

  removeAll() {
    this.request.flights = [];
    this.flightLegsDS.data = this.request.flights;
  }

  removeAt(index: number) {
    this.request.flights.splice(index, 1);
    this.flightLegsDS.data = this.request.flights;
  }

  save() {
    console.log("save request")
    this.request.brokerRef = '/CompanyList/' + this.request.brokerRef;
    console.log(this.request)

    this.flightService.saveRequest(this.request);
    this.router.navigate(['/flightRequests', { status: 'New' }]);
  }

}