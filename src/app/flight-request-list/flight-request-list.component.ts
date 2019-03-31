import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { FlightLeg } from '../../model/flight-leg';
import { FlightRequestStatus } from '../../model/flight-request-status.enum';
import { FlightRequestService } from '../../services/flight-request.service';
import { FlightRequest } from '../../model/flight-request';






@Component({
  selector: 'flight-request-list',
  templateUrl: './flight-request-list.component.html',
  styleUrls: ['./flight-request-list.component.css']
})
export class FlightRequestListComponent {

  requests: FlightRequest[] = [];
  status: string;

  constructor(public flightService: FlightRequestService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.status = params.get("status");
      console.log("değişti: ", this.status);

      this.requests = this.flightService.getRequests()

      if (this.status)
        this.requests = this.requests.filter(req => this.status == FlightRequestStatus[req.status]);
    });

  }

}