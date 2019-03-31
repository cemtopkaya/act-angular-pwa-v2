import { Injectable } from '@angular/core';
import { SalesPerson } from '../model/sales-person';

import { Observable } from 'rxjs';

import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

const currentUser = <SalesPerson>{
  id: 123,
  name: "Elvan",
  surname: "Özkul"
}

@Injectable()
export class UserService {

  collSalesmen = 'SalesmenList'
  currentUserKey = 'z77lYhScLphpp4lITr7S'

  constructor(private db: AngularFirestore) { }

  getCurrentUser() {
    return this.db.collection(this.collSalesmen).doc(this.currentUserKey).snapshotChanges()
  }

  getUsers() {
    return this.db.collection(this.collSalesmen).snapshotChanges()
  }

}