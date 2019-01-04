import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatDialog} from '@angular/material';
import { CredentialService } from '../../service/service';
import { DeleteComponent } from './dailog-delete.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ShareComponent } from './dialog-share.component';

@Component({
  selector: 'app-credential-detail',
  templateUrl: './credential-detail.component.html',
  styleUrls: ['./credential-detail.component.scss']
})
export class CredentialDetailComponent implements OnInit {
  @Input() details: {
    date: "",
    description: "",
    email: "",
    password: "",
    title: "",
    userId: "",
    _id: "",
    sharedBy: "",
    category: "",
    extra: ""
  };
  @Input() AddCollection: boolean;
  @Input() loadingDetail: boolean;
  @Output() clearCollection = new EventEmitter();

  collection: FormGroup;
  collectionForm:boolean = false;
  edit:boolean = false;
  name: String;
  categories = ["My Collections", "Gitlab", "GitHub", 
                "Gmail", "Facebook", "Youtube", "Personal"];

  constructor(
    private loginFormBuilder: FormBuilder,
    private credentialService: CredentialService,
    private totast: ToastrManager,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;

    this.collection = this.loginFormBuilder.group ({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidators.email])] ,
      password: ['' , Validators.compose ( [ Validators.required ] )],
      category: ['', Validators.compose([Validators.required])],
      extra: ['', Validators.compose([Validators.required])],
    } );
  }

  addData() {
    this.collectionForm = true;
    if (this.collection.invalid) {
      return;
    }
    this.credentialService.postCredential(this.collection.value).subscribe(
      res => {
        this.totast.successToastr(res.msg, 'Success!');
        this.clearCollection.emit();
      },
      err => console.log(err)
    )
  }

  clearData () {
    this.collectionForm = false;
    this.AddCollection = false;
    this.edit = false;
    this.clearCollection.emit();
  }

  share (id) {
    let email = JSON.parse(localStorage.getItem('currentUser')).email;
    let dialogRef = this.dialog.open(ShareComponent, {
      data: { id : id, email: email },
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.clearCollection.emit();
    })
  }

  deleteCollection(id) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        id: id
      },
      width:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearCollection.emit();
    })
  }

  editCollection() {
    this.AddCollection = true;
    this.collection.patchValue(this.details);
    this.edit = true;
  }

  updateCollection () {
    this.collectionForm = true;
    if (this.collection.invalid) {
      return;
    }
    this.credentialService.updateCollection(this.details._id,this.collection.value).subscribe(
      res => {
        this.totast.successToastr(res.msg, 'Success!');
        this.clearCollection.emit();
        this.edit = false;
        this.AddCollection = false;
      },
      err => console.log(err)
    )
  }

}
