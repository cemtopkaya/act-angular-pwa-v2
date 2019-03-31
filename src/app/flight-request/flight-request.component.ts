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
  flightBroker: number = 1;


  constructor(
    public flightService: FlightRequestService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    var a = this.flightService
      .getBrokers()
      .subscribe(function (data) {
        console.log("Brokerssss: ", data)
        this.brokers = data;
      });

    this.flightRevenueTypes = ['Ferry', 'Live'];
    this.currentUser = this.userService.getCurrentUser();

    this.request = <FlightRequest>{
      status: FlightRequestStatus['New'],
      createdBy: this.currentUser,
      createdDate: (new Date()).toLocaleDateString(),
      flights: []
    };
  }

  addFlightLeg() {
    const flightLeg = <FlightLeg>{
      date: this.flightDate.toLocaleDateString(),
      from: this.flightFrom,
      to: this.flightTo,
      type: this.flightRevenue
    };
    this.request.flights.push(flightLeg);
    this.flightLegsDS.data = this.request.flights;
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
    this.request.broker = this.brokers.find(b => b.id == this.flightBroker).name;
    console.log(this.flightBroker)
    this.flightService.saveRequest(this.request);
    this.router.navigate(['/flightRequests', { status: 'New' }]);
  }

}