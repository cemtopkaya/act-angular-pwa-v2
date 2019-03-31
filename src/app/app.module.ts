import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import 'hammerjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';


/******  Firebase Modules ******/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/******  Components ******/
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FlightRequestListComponent } from './flight-request-list/flight-request-list.component';
import { FlightRequestComponent } from './flight-request/flight-request.component';
import { FlightRequestCardComponent } from './flight-request-card/flight-request-card.component';


/******  Services ******/
import { FlightRequestService } from '../services/flight-request.service';
import { UserService } from '../services/user.service';


/******  Utils ******/
import { TURKISH_DATE_FORMATS, TurkishDateFormat } from '../utils/turkish-date-format';


/******  Routes ******/
const routes: Route[] = [
  { path: "", component: FlightRequestListComponent, pathMatch: "full" },
  { path: "flightRequests", component: FlightRequestListComponent },
  { path: "flightRequests/:status", component: FlightRequestListComponent },
  { path: "flightRequest", component: FlightRequestComponent },
]

const configFirebase = {
    apiKey: "AIzaSyB6CAyB9yVvpjxAwKF5GUX6il2-uOcX6jI",
    authDomain: "sunexpwa-ae26d.firebaseapp.com",
    databaseURL: "https://sunexpwa-ae26d.firebaseio.com",
    projectId: "sunexpwa-ae26d",
    storageBucket: "sunexpwa-ae26d.appspot.com",
    messagingSenderId: "666998141049"
  };

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AngularFireModule.initializeApp(configFirebase,'sunpwam'),
    AngularFireDatabaseModule

  ],
  declarations: [
    AppComponent,
    HelloComponent,
    FlightRequestListComponent,
    FlightRequestComponent,
    FlightRequestCardComponent
  ],
  providers: [
    UserService,
    FlightRequestService,
    { provide: DateAdapter, useClass: TurkishDateFormat },
    { provide: MAT_DATE_FORMATS, useValue: TURKISH_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


