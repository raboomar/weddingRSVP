import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { ViewGuestComponent } from './components/view-guest/view-guest.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'add/friends',
    pathMatch: 'full',
  },
  {
    path: 'add/friends',
    component: GuestFormComponent,
    data: { guestType: 'friends' }
  },
  {
    path: 'add/family',
    component: GuestFormComponent,
    data: { guestType: 'family' }
  },

  {
    path: 'guest-list',
    resolve: {isAuthenticated:AuthGaurdService},
    component: GuestListComponent,

  },
  {
    path: 'view-guest/:guestId',
    resolve: {isAuthenticated:AuthGaurdService},
    component: ViewGuestComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '**',
    component: GuestFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
