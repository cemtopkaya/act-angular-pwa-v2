
import { FlightLeg } from './flight-leg';
import { SalesPerson } from './sales-person';
import { FlightRequestStatus } from './flight-request-status.enum';


export class FlightRequest {
  status: FlightRequestStatus;
  broker:string;
  createdBy:SalesPerson;
  createdDate:string;
  flights:FlightLeg[];
}