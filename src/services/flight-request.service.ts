import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

import { FlightRequest } from '../model/flight-request';
import { FlightRequestStatus } from '../model/flight-request-status.enum';
import { Broker } from '../model/broker';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const reqs: FlightRequest[] = [
  {
    createdBy: {
      id: 123,
      name: "Elvan",
      surname: "Özkul"
    },
    createdDate: "25.02.2019",
    status: FlightRequestStatus["Active"],
    broker: "Sunexpress",
    flights: [
      { date: '01.03.2019', from: 'AYT', to: 'FKB', type: 'Ferry' },
      { date: '22.03.2019', from: 'FKB', to: 'AYT', type: 'Live' }
    ]
  },
  {
    createdBy: {
      id: 231,
      name: "Gülfen",
      surname: "Songül"
    },
    createdDate: "25.02.2019",
    status: FlightRequestStatus["Active"],
    broker: "Go2Sky",
    flights: [
      { date: '01.03.2019', from: 'AYT', to: 'FKB', type: 'Ferry' },
      { date: '15.03.2019', from: 'FKB', to: 'STR', type: 'Live' },
      { date: '22.03.2019', from: 'STR', to: 'AYT', type: 'Ferry' }
    ]
  },
  {
    createdBy: {
      id: 312,
      name: "Fulya",
      surname: "Çetin"
    },
    createdDate: "25.02.2019",
    status: FlightRequestStatus["New"],
    broker: "Corendon",
    flights: [
      { date: '01.03.2019', from: 'AYT', to: 'FKB', type: 'Ferry' },
      { date: '08.03.2019', from: 'FKB', to: 'BUD', type: 'Live' },
      { date: '15.03.2019', from: 'BUD', to: 'STR', type: 'Live' },
      { date: '22.03.2019', from: 'STR', to: 'AYT', type: 'Ferry' }
    ]
  },
  {
    createdBy: 123,
    status: FlightRequestStatus["Cancelled"],
    broker: "FreeBird",
    flights: [
      { date: '01.03.2019', from: 'AYT', to: 'FKB', type: 'Ferry' },
      { date: '08.03.2019', from: 'FKB', to: 'BUD', type: 'Live' },
      { date: '15.03.2019', from: 'BUD', to: 'DUS', type: 'Live' },
      { date: '08.03.2019', from: 'DUS', to: 'AMS', type: 'Live' },
      { date: '15.03.2019', from: 'AMS', to: 'STR', type: 'Live' },
      { date: '22.03.2019', from: 'STR', to: 'AYT', type: 'Ferry' }
    ]
  }
];


@Injectable()
export class FlightRequestService {

  private collBroker: string = 'CompanyList';
  private collRequest: string = '/RequestList';

  constructor(private db: AngularFirestore) { }

  getBrokers() {
    return this.db.collection(this.collBroker).snapshotChanges()
  }

  getRequests() {
    return this.db.collection(this.collRequest).snapshotChanges()
  }

  saveRequest(request: FlightRequest) {

    console.log("Save Request")
    const req = {
      brokerRef: this.db.doc('CompanyList/' + request.brokerRef).ref,
      createdByRef: request.createdByRef,
      createdDate: request.createdDate,
      flights: request.flights.map(f => {
        delete (f.from);
        delete (f.to);
        return f;
      })
    }
    this.db.collection(this.collRequest).add(req).then(ref => {
      console.log("REFFFF: ", ref)
      // ref.update({ brokerRef: request.brokerRef}).then(console.log)
      //this.db.collection(this.collRequest).doc(ref)
    })
    // reqs.push();
    //.collection(this.collBroker)
  }
}

/*
{
      brokerRef: request.brokerRef,
createdByRef: request.createdByRef,
createdDate: request.createdDate,
    }

    
    {"status":0,"createdDate":"01.04.2019 00:25:53","flights":[{"date":"20.04.2019 00:00:00","from":"AYT","to":"SAW","type":"Live","fromRef":"/IATACodeList/AYT","toRef":"/IATACodeList/SAW"},{"date":"20.04.2019 00:00:00","from":"SAW","to":"AYT","type":"Live","fromRef":"/IATACodeList/SAW","toRef":"/IATACodeList/AYT"}],"createdBy":{"key":"z77lYhScLphpp4lITr7S","name":"Elvan","surname":"Özkul"},"createdByRef":"/SalesmenList/z77lYhScLphpp4lITr7S","brokerRef":"/CompanyList/6uX5l7XTUwGcLCH2o9kM"}

 */