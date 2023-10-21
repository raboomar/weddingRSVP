import { Component } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';
import {MatTableDataSource} from '@angular/material/table'
import { InviteeList } from 'src/app/model/guest.model';
@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent {
  loading = this.loader.loading$
  isLoading:boolean = false
  displayedColumns: string[] = ['Guest #', 'name', 'email', 'RSVPDate','action'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  guestList:InviteeList[] = [];
    constructor( private loader: SpinnerServiceService,
    private guestService: GuestService){}

    ngOnInit(): void {
      this.isLoading = true
     this.guestService.fetchGuestList().subscribe(response=>{
      this.dataSource.data = response
      this.isLoading = false
     })
    }

    viewGuestDetails(guestId:string){
      console.log(guestId);

    }

    buildTable () {
      this.dataSource.data= this.guestList

    }
}
