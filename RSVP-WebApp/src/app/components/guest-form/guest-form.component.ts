import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent {
  loading = this.loader.loading$
  email = new FormControl('', [Validators.required, Validators.email]);
  public guestForm: FormGroup =new FormGroup({});
  public validationMsgs = {
    'firstName': [{ type: 'name', message: 'Enter a name' }]
  }

  constructor( private formBuilder: FormBuilder, private loader: SpinnerServiceService) { }
  ngOnInit() {
    this.guestForm = this.formBuilder.group({
      name: this.formBuilder.array([this.createGuestFormGroup()])
    });
  }

  public removeOrClearEmail(i: number) {
    const name = this.guestForm.get('name') as FormArray
    if (name.length > 1) {
      name.removeAt(i)
    } else {
      name.reset()
    }
  }

  public addguestFormGroup() {
    const name = this.guestForm.get('name') as FormArray
    name.push(this.createGuestFormGroup())
  }

  private createGuestFormGroup(): FormGroup {
    return new FormGroup({
      'firstName': new FormControl('', Validators.min(1)),
      'lastName': new FormControl('', Validators.required)

    })
  }

  getControls() {
    return (this.guestForm.get('name') as FormArray).controls;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addGuest(){

    const guestForm = JSON.stringify({
      "email": this.email.value,
      "guest":this.guestForm.value.name
    })
    // this.isLoading = true
    // this.formService.addGuest(guestForm).subscribe(res=>{
    //   this.isLoading = false
    //   this.succuss = true
    // })
  }

}


