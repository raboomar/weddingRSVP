import { NgModule,Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import{MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { NetworkInterceptor } from './network/network.interceptor';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { MatTableModule } from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import { ViewGuestComponent } from './components/view-guest/view-guest.component';
import {MatListModule} from '@angular/material/list';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    GuestFormComponent,
    GuestListComponent,
    ViewGuestComponent,
    LoginComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatSnackBarModule,
    MatExpansionModule
    ],
  providers: [{

    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
