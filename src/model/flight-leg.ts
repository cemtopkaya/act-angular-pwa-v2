
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

export class FlightLeg {
  date: string;
  from: string;
  to: string;
  type: string;

  fromRef: DocumentReference;
  toRef: DocumentReference;
}