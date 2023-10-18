import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatIconModule} from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'

@NgModule({
  declarations: [
    AppComponent,
    GuestFormComponent
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
