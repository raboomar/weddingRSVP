import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar){}

  openSnackBar(message: string,
    action: string = 'Close',
    duration: number = 2000,
    backgroundColor: string ,
    textColor: string
    ) {
      console.log(backgroundColor);

    const config = new MatSnackBarConfig();
    config.duration = duration
    config.verticalPosition = 'top'
    config.horizontalPosition = 'center'
    this.snackBar.open(message, action, {
      ...config,
      panelClass: ['custom-snackbar'],
      data: {
        backgroundColor,
        textColor,
      },
    });
  }
}
