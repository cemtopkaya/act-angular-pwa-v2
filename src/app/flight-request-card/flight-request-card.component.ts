import { Component, OnInit, Input } from '@angular/core';

import { FlightRequest } from '../../model/flight-request';
import { FlightRequestStatus } from '../../model/flight-request-status.enum';
import { FlightLeg } from '../../model/flight-leg';

@Component({
  selector: 'flight-request-card',
  templateUrl: './flight-request-card.component.html',
  styleUrls: ['./flight-request-card.component.css']
})
export class FlightRequestCardComponent implements OnInit {

  displayedColumns: string[] = ['date', 'from', 'to', 'type'];
  request:FlightRequest;
  requestStatus : string;


  private _requestInfo:FlightRequest;
  @Input() set requestInfo(val:FlightRequest){
    this.request = val;
    this.requestStatus = FlightRequestStatus[this.request.status];
  }

  ngOnInit() {

  }
}