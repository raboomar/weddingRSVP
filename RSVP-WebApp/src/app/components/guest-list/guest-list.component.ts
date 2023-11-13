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
    @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
     }
  paginator!: MatPaginator;

  loading = this.loader.loading$
  isLoading:boolean = false
  displayedColumns: string[] = ['Guest #', 'name', 'email', 'RSVPDate','action'];
  dataSource: MatTableDataSource<InviteeList> = new MatTableDataSource<InviteeList>([]);
  guestList:InviteeList[] = [];
  totalFamilies: number = 0
  totalGuest:number=0;

  constructor( private loader: SpinnerServiceService,
    private guestService: GuestService,
    private router: Router,
    ){
    }

    ngOnInit(): void {
      this.isLoading = true;
      this.guestService.fetchGuestList().subscribe(response=>{
        this.guestList = response;
        this.dataSource.data = response;
        this.totalFamilies = response.length;
        this.countTotalGuest(response);
        this.isLoading = false;
      })

    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

    viewGuestDetails(guestId:string){
      this.router.navigate([`/view-guest/${guestId}`])
    }

    countTotalGuest(guestList:InviteeList[]){
      let totalGuest = 0;
      guestList.map(guest=>{
        totalGuest += guest.guest.length
      })
      this.totalGuest= totalGuest;
    }
    handlePageEvent(event:PageEvent){
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.dataSource.data = this.guestList.slice(startIndex, endIndex);
    }
}


