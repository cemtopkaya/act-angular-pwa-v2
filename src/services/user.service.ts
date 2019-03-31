import { Injectable } from '@angular/core';
import { SalesPerson } from '../model/sales-person';

const currentUser = <SalesPerson>{
  id: 123,
  name: "Elvan",
  surname: "Özkul"
}

@Injectable()
export class UserService {

  constructor() { }

  getCurrentUser(): SalesPerson {
    return currentUser;
  }

}