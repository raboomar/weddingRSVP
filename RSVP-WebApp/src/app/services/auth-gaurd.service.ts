import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService  {

  constructor(
    private authenticationService:AuthenticationService,
    private router: Router,
  ) { }


  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const user = await this.authenticationService.checkAuthentication();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


