import { Component, Inject, NgZone } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CredentialService } from '../../service/service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete',
  template: `
  <h1 mat-dialog-title style="text-align: -webkit-center;margin-bottom:0; ">Share Credential</h1>
    <form [formGroup]="share">   
      <div mat-dialog-content style="text-align:center;">

        <mat-form-field style="width:100%;">
          <mat-select placeholder="Share" [formControl]="share.controls['user_id']">
            <mat-option *ngFor="let list of shareList" [value]="list._id">
              {{list.email}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <small *ngIf="shareForm && share.controls['user_id'].hasError('required')" class="text-danger support-text">You must enter a Share Email.</small>
      </div>
      <div mat-dialog-actions style="width:100%;">
        <div style="width:60%;"></div> 
        <div style="width:40%;">
          <button style=" color: #fff;background-color: #5cb85c;border-color: #4cae4c;" mat-raised-button color="primary" [mat-dialog-close]="true" (click)="onNoClick()">Yes</button>
          <button mat-raised-button color="warn" (click)="closedialog()">No</button>
        </div>
      </div>
    </form>
  `
})

export class ShareComponent {
    public share: FormGroup;
    shareForm:boolean = false;

    credentialId: '';
    sharedBy: '';
    user_id: '';
    loading: boolean = false;
    shareList = [];


   constructor(public dialogRef: MatDialogRef<ShareComponent>,
    private shareFormBuilder: FormBuilder,
    public dialog:MatDialog ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private totast: ToastrManager,
    private credentialService: CredentialService
    ){  
        this.credentialId = this.data.id;
        this.sharedBy = this.data.email;
    }

    ngOnInit () {
        this.share = this.shareFormBuilder.group ({
            user_id : ['', Validators.compose([Validators.required])],
          } );

        this.credentialId = this.data.id;
        this.sharedBy = this.data.email;
        this.loading = true;
        this.credentialService.getUsersData().subscribe(
            res => {
              this.loading = false;
              this.shareList = res.response},
            err => console.log(err)
        )
    }
    
    onNoClick(){
        this.shareForm = true;
        if (this.share.invalid) {
        return;
        }
        this.user_id = this.share.value.user_id;
        this.credentialService.postSharedData(this.user_id,this.sharedBy,this.credentialId,).subscribe(
          (res) => {
            this.totast.successToastr(res.msg, 'Success!'); 
           },
          (err) => {
              
           })
    }


       closedialog(){
           this.dialogRef.close();
       }

}
