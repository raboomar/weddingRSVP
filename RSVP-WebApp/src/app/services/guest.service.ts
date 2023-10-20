import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Guest } from '../model/guest.model';
import { environment } from 'src/environments/environment';
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
   return this.http
   .post<any>(
     `${environment.apiUrl}`,
     JSON.stringify(data),
     this.httpOptions
   ).pipe(retry(1), catchError(this.handleError))
  }

  fetchGuestList ():Observable<any>{
    return this.http
    .get<any>(
      `${environment.apiUrl}`,
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
