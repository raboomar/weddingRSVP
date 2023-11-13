import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteeList } from 'src/app/model/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private loader: SpinnerServiceService,
    private router: Router,
    private snackbarService:SnackbarService){
  }

  ngOnInit(): void {
    this.isLoading = true
  this.guestId =  this.activatedRoute.snapshot.paramMap.get('guestId') || '';
    this.guestService.fetchGuestDetails(this.guestId).subscribe((response)=>{
      this.guest = [response];
      this.isLoading = false
    })
  }

  deleteGuest (guestId:string){
    this.isLoading = true;
   if (this.guest[0].guest.length ===1){
    this.guestService.deleteGuest(guestId).subscribe({
      next: (response) =>{
        this.isLoading = false;
      },
      error:error => console.log(error),
      complete: () =>{
        this.router.navigate(['guest-list'])
        this.isLoading = false;
        this.snackbarService.openSnackBar('Guest deleted!', 'Close', 300, '#008000', '#008000');
      }

    })
   }
  }

}
