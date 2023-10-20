import { Component } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent {
  loading = this.loader.loading$
  isLoading:boolean = false
  constructor( private loader: SpinnerServiceService,
    private guestService: GuestService){}

    ngOnInit(): void {
     this.guestService.fetchGuestList().subscribe(response=>{
      console.log(response);

     })

    }
}
