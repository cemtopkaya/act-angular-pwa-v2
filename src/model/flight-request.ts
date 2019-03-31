
import { FlightLeg } from './flight-leg';
import { SalesPerson } from './sales-person';
import { FlightRequestStatus } from './flight-request-status.enum';
import { UserService } from '../services/user.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';


export class FlightRequest {
  status: FlightRequestStatus;
  broker: string;
  createdBy: SalesPerson;
  createdDate: string;
  flights: FlightLeg[];

  brokerRef: DocumentReference
  createdByRef: DocumentReference

  constructor(userService: UserService,private db: AngularFirestore) {
    this.status = FlightRequestStatus['New']
    this.createdDate = (new Date()).toLocaleString()
    this.flights = []
    
    let _this = this;
    userService.getCurrentUser().subscribe(actionArray => {
      _this.createdBy = { key: actionArray.payload.id, ...actionArray.payload.data() }
      _this.createdByRef = _this.db.doc('SalesmenList/'+ _this.createdBy.key).ref;
    })
  }
}