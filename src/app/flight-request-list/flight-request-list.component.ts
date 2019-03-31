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

      this.flightService.getRequests().subscribe(actionArray=>{
        this.requests = actionArray.map(val => {
          console.log("val: ",val)
          const doc = val.payload.doc;
          const data = doc.data();
          const obj = { key: doc.id, ...data }
          obj.creationDate = data.createdDate.toDate()
          
          data.createdByRef.get().then(d=>{
            debugger
            console.log("createdBy get", d)
            obj.createdBy = d.data()
          })
          
          data.brokerRef.get().then(d=>{
            debugger
            console.log("brokerRef get", d)
            obj.broker = d.data()
          })
          
          data.flights.forEach((f, idx)=>{
            
            f.toRef.get().then(d=>{
              console.log("toRef:" ,d.data())
              obj.flights[idx].to = d.data()
            })

            f.fromRef.get().then(d=>{
              console.log("fromRef:" ,d.data())
              obj.flights[idx].from = d.data()
            })
          })
          
          console.log("obj: ",obj)
          return obj
        })
      })

      if (this.status)
        this.requests = this.requests.filter(req => this.status == FlightRequestStatus[req.status]);
    });

  }

}