import { Injectable } from '@angular/core';

import { AngularFireDatabase,AngularFireObject, AngularFireList } from 'angularfire2/database';

import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

import { FlightRequest } from '../model/flight-request';
import { FlightRequestStatus } from '../model/flight-request-status.enum';
import { Broker } from '../model/broker';
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

  getBrokers(): any {
    return this.db.collection(this.collBroker).snapshotChanges()
  }

  getRequests(): any {
    return this.db.collection(this.collRequest).snapshotChanges()
   // return reqs;
  }

  saveRequest(request: FlightRequest) {
    reqs.push(request);
  }
}