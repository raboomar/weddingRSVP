import { Component } from '@angular/core';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent {
  loading = this.loader.loading$
  isLoading:boolean = false
  constructor( private loader: SpinnerServiceService){}
}
