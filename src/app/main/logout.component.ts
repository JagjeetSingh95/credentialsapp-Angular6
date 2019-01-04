import { Component, Inject, NgZone } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
  <h1 mat-dialog-title style="text-align: -webkit-center;margin-bottom:0; ">Delete Credential</h1>
           <div mat-dialog-content class="text-center" style="text-align:center;">
              <p>Do you really want to Logout?
              </p>
          </div>
        <div mat-dialog-actions style="width:100%;">
          <div style="width:60%;"></div>
          <div>
            <button mat-raised-button style=" color: #fff;background-color: #5cb85c;border-color: #4cae4c;" color="primary" [mat-dialog-close]="true" (click)="onNoClick()">Yes</button>
            <button mat-raised-button color="warn" (click)="closedialog()">No</button>
          </div>
        </div>
  `
})

export class LogoutComponent {

   constructor(public dialogRef: MatDialogRef<LogoutComponent>,
    public dialog:MatDialog ,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any){  
    }

    ngOnInit () {
    }
    
    onNoClick(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['/signin']);
    }

    closedialog(){
        this.dialogRef.close();
    }

}
