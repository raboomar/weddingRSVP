import { Component,ViewChild } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';
import {MatTableDataSource} from '@angular/material/table'
import { InviteeList } from 'src/app/model/guest.model';
import {MatPaginator, PageEvent}  from'@angular/material/paginator'
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  loading = this.loader.loading$
  isLoading:boolean = false
  displayedColumns: string[] = ['Guest #', 'name', 'email', 'RSVPDate','action'];

  guestList:InviteeList[] = [];
  totalGuest:number=0;


  pagedItems: any[] = [];
  totalItems: number;
  itemsPerPage = 10;

  constructor( private loader: SpinnerServiceService,
    private guestService: GuestService,
    private router: Router,
    ){
    }

    ngOnInit(): void {
      this.isLoading = true;
      this.guestService.fetchGuestList().subscribe(response=>{
        this.countTotalGuest(response);
        this.guestList = response
        this.totalItems = response.length
        this.itemsPerPage = 10;
        this.pageChanged({
          pageIndex: 0, pageSize: this.itemsPerPage,
          length: 0
        } )
        this.isLoading = false;
      })
    }


    countTotalGuest(guestList:InviteeList[]){
      let totalGuest = 0;
      guestList.map(guest=>{
        totalGuest += guest.guest.length
      })
      this.totalGuest= totalGuest;

    }
    sortData(guestList:InviteeList[]){

     guestList.sort((guestA:InviteeList, guestB:InviteeList)=>{
       return new Date(guestB.dateRsvp).valueOf() - new Date(guestA.dateRsvp).valueOf()
    }
       )
    }

    pageChanged(event: PageEvent) {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.sortData(this.guestList)
      this.pagedItems = this.guestList.slice(startIndex, endIndex);
    }

  }
