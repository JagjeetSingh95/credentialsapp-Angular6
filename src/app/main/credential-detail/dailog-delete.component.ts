import { Component, Inject, NgZone } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CredentialService } from '../../service/service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete',
  template: `
  <h1 mat-dialog-title style="text-align: -webkit-center;margin-bottom:0; ">Delete Credential</h1>
           <div mat-dialog-content style="text-align:center;">
              <p>Do you really want to delete this Credential?
              </p>
          </div>
        <div mat-dialog-actions style="width:100%;">
          <div style="width:60%;"></div> 
          <div style="width:40%;">
            <button style=" color: #fff;background-color: #5cb85c;border-color: #4cae4c;" mat-raised-button color="primary" [mat-dialog-close]="true" (click)="onNoClick()">Yes</button>
            <button mat-raised-button color="warn" (click)="closedialog()">No</button>
          </div>
        </div>
  `
})

export class DeleteComponent {
    id = '';

   constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    public dialog:MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private totast: ToastrManager,
    private credentialService: CredentialService
    ){  
      this.id = this.data.id;
    }

    ngOnInit () {
    }
    
    onNoClick(){
        this.credentialService.deleteCollection(this.id).subscribe(
          (res) => {
            this.totast.successToastr(res.msg, 'Success!'); 
           },
          (err) => {
              
           }
       )};


       closedialog(){
           this.dialogRef.close();
       }

}
