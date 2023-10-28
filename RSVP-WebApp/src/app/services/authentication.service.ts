import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, throwError } from 'rxjs';
import { FirebaseError, SignIn } from 'src/app/model/signIn.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated:boolean;
  constructor(private auth: AngularFireAuth) { }

    public isRouteAuthenticated():boolean{
      return this.isAuthenticated;
    }

    public setIsAuthenticated(isAuth:boolean):void{
      this.isAuthenticated = isAuth;
    }

    signIn(params: SignIn): Observable<any> {
      return from(this.auth.signInWithEmailAndPassword(
        params.email, params.password
      )).pipe(
        catchError((error: FirebaseError) =>
          throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
        )
      );
    }
    recoverPassword(email: string): Observable<void> {
      return from(this.auth.sendPasswordResetEmail(email)).pipe(
        catchError((error: FirebaseError) =>
          throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
        )
      );
    }

    private translateFirebaseErrorMessage({code, message}: FirebaseError) {
      if (code === "auth/user-not-found") {
        return "User not found.";
      }
      if (code === "auth/wrong-password") {
        return "User not found.";
      }
      return message;
    }



    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
}
