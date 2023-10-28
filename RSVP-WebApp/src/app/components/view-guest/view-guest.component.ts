import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InviteeList } from 'src/app/model/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-view-guest',
  templateUrl: './view-guest.component.html',
  styleUrls: ['./view-guest.component.css']
})
export class ViewGuestComponent {
  guestId: string = ''
  guest: InviteeList[];
  loading = this.loader.loading$
  isLoading:boolean = false

  constructor(private activatedRoute: ActivatedRoute,
    private guestService:GuestService,
    private loader: SpinnerServiceService){
  }

  ngOnInit(): void {
    this.isLoading = true
  this.guestId =  this.activatedRoute.snapshot.paramMap.get('guestId') || '';
    this.guestService.fetchGuestDetails(this.guestId).subscribe((response)=>{
      this.guest = [response];
      this.isLoading = false
    })


  }

}
