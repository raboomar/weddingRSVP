import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestFormComponent } from './components/guest-form/guest-form.component';

const routes: Routes = [
  {path:'', redirectTo:'add', pathMatch:'full'},
  {path:'add',component: GuestFormComponent },
  {path:"**", component: GuestFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
