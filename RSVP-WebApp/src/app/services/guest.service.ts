import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Guest } from '../model/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addGuest (data:Guest):Observable<any>{
    // `${environment.apiUrl}/saveGuestToSheet`
   return this.http
   .post<any>(
     'https://v7gtcbe8lh.execute-api.us-east-1.amazonaws.com/guest',
     JSON.stringify(data),
     this.httpOptions
   ).pipe(retry(1), catchError(this.handleError))
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
