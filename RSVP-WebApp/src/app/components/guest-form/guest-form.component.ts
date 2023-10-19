import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from 'src/app/model/guest.model';
import { GuestService } from 'src/app/services/guest.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent {
  guestEmail:string | null =''
  isLoading:boolean = false
  succuss:boolean =false
  loading = this.loader.loading$

  email = new FormControl('', [Validators.required, Validators.email]);
  public guestForm: FormGroup =new FormGroup({});
  public validationMsgs = {
    'firstName': [{ type: 'text', message: 'Enter a name' }]
  }

  constructor( private formBuilder: FormBuilder,
     private loader: SpinnerServiceService,
     private guestService:GuestService) { }
  ngOnInit() {
    this.guestForm = this.formBuilder.group({
      guestName: this.formBuilder.array([this.createGuestFormGroup()])
    });
  }

  public removeOrClearEmail(i: number) {
    const guestName = this.guestForm.get('guestName') as FormArray
    if (guestName.length > 1) {
      guestName.removeAt(i)
    } else {
      guestName.reset()
    }
  }

  public addguestFormGroup() {
    const name = this.guestForm.get('guestName') as FormArray
    name.push(this.createGuestFormGroup())
  }

  private createGuestFormGroup(): FormGroup {
    return new FormGroup({
      'firstName': new FormControl('', Validators.min(1)),
      'lastName': new FormControl('', Validators.required)

    })
  }

  getControls() {
    return (this.guestForm.get('guestName') as FormArray).controls;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addGuest(){
    this.guestEmail =this.email.value
    const guestForm = {
      "email": this.email.value,
      "date": new Date().toString(),
      "guest":this.guestForm.value.guestName
    }
    this.isLoading = true
    this.guestService.addGuest(guestForm).subscribe(res=>{
      this.isLoading = false
      this.succuss = true
    })
  }

}


