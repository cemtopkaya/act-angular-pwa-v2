
import { FlightLeg } from './flight-leg';
import { SalesPerson } from './sales-person';
import { FlightRequestStatus } from './flight-request-status.enum';
import { UserService } from '../services/user.service';


export class FlightRequest {
  status: FlightRequestStatus;
  broker: string;
  createdBy: SalesPerson;
  createdDate: string;
  flights: FlightLeg[];

  brokerRef: String;
  createdByRef: String;

  constructor(userService: UserService) {
    this.status = FlightRequestStatus['New']
    this.createdDate = (new Date()).toLocaleString()
    this.flights = []
    
    userService.getCurrentUser().subscribe(actionArray => {
      this.createdBy = { key: actionArray.payload.id, ...actionArray.payload.data() }
      this.createdByRef = '/SalesmenList/' + this.createdBy.key;
    })
  }
}