import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpinnerServiceService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = this.loader.loading$
  isLoading:boolean = false
  form!: FormGroup;
  isLoggingIn:boolean = false;
  isRecoveringPassword:boolean = false;
  isError:boolean = false

  constructor( private loader: SpinnerServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ){
    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });

    }

    login() {
      this.isLoggingIn = true;
      this.isLoading = true
      this.authenticationService.signIn({
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe({ next: (res)=>{
        // console.log(res);

        this.isLoading = false
        this.router.navigate(['guest-list'])
      },error:(error)=>{
        this.isLoggingIn = false;
        this.isLoading = false
        this.isError = true
      }
    });
    }
    recoverPassword() {
      this.isLoading = true
      this.isRecoveringPassword = true;
      this.authenticationService.recoverPassword(
        this.form.value.email
      ).subscribe({
        next: (res) => {
          this.isRecoveringPassword = false;
          this.isLoading = false
          console.log(res);

        },
        error: error => {
          this.isRecoveringPassword = false;
          this.isLoading = false
          console.log(error);
        }
      })
    }
}
