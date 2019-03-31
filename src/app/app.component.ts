import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  name = 'Angular';


  links: any[] = [
    { count:1, text: "New", icon: "playlist_add", address: "New" },
    { count:3, text: "Active", icon: "queue_play_next", address: "Active" },
    { count:213, text: "Approved", icon: "playlist_play", address: "Approved" },
    { count:31, text: "Cancelled", icon: "cancel", address: "Cancelled" },
    { count:8, text: "Rejected", icon: "not_interested", address: "Rejected" },
  ];

}
