import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { FlightRequest } from '../model/flight-request';
import { FlightRequestStatus } from '../model/flight-request-status.enum';
import { Broker } from '../model/broker';


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

  private dbNameBroker: string = '/CompanyList';
  private dbNameRequest: string = '/Request';

  
  constructor(private db: AngularFireDatabase) { }

  getBrokers(): any {

    this.db.object('/CompanyList')
      .valueChanges()
      .subscribe(val => {
        console.log("VAL:", val);
      });

    // const brokers: Broker[] = [
    //   { id: 1, name: 'Sunexpress', logo: 'https://pbs.twimg.com/profile_images/1036993386333581312/rOS-y7nA.jpg' },
    //   { id: 2, name: 'Corendon', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Go2sky_logo.png' },
    //   { id: 3, name: 'Go2Sky', logo: 'https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/ab/39/62/ab396269-8ec3-34f6-636c-7c30346ee73f/source/256x256bb.jpg' },
    //   { id: 4, name: 'FreeBird', logo: 'https://i.pinimg.com/originals/14/ff/a4/14ffa44fd6f686bdb83d747a578d63ed.png' },
    // ];
    let brokers = this.db.list(this.dbNameBroker).valueChanges();
    // debugger;
    return brokers;
  }

  getRequests(): FlightRequest[] {
    return reqs;

  }

  saveRequest(request: FlightRequest) {
    reqs.push(request);
  }
}