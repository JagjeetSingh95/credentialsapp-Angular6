import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { 
 CredentialService
} from '../service/service';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from './logout.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  credentials = [];
  id:any;
  details = {};
  collectionCount: Number;
  sharedCollectionCount: Number;
  AddCollection:boolean = false;
  categoryList = [];
  byDefaultCategory = "My Collections";
  loadingList:boolean = false;
  loadingDetail:boolean = false;
  searchForm: FormGroup;

  constructor(
    private searchBuilder: FormBuilder,
    private credentialService: CredentialService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.getDefaultCredential();
   }

  ngOnInit() {
    this.getCollection(this.byDefaultCategory);
    this.getSharedCount();

    this.getCategory();

    this.searchForm = this.searchBuilder.group({
      search : [''],
    });
  }

  setIdEvent(event) {
    this.details = this.credentials.find(list => list._id === event);
  }

  getDefaultCredential () {
    this.loadingDetail = true;
    this.credentialService.getDefalutCredential().subscribe(
      res => {
        this.loadingDetail = false;
        this.details = res.response;
      },
      err => console.log(err)
    )
  }

  getCollection (value) {
    this.loadingList = true;
    this.credentialService.getCredential().subscribe(
      res => {
        this.loadingList = false;
        this.collectionCount = res.count;
        this.credentials = res.response.filter(element => element.category == value);
       
      },
      err => console.log(err)
    )
  }

  getSharedCount () {
    this.credentialService.getSharedData().subscribe(
      res => {
        this.sharedCollectionCount = res.count;
      },
      err => console.log(err)
    )
  }

  getSharedColllection () {
    this.loadingList = true;
    this.credentialService.getSharedData().subscribe(
      res => {
        this.loadingList = false;
        this.sharedCollectionCount = res.count;
        this.credentials = res.share;
        
        console.log(res)
      },
      err => console.log(err)
    )
  }

  getCategory () {
    this.credentialService.getCategory().subscribe(
      res => {
        this.categoryList = [...Array.from(new Set(res.response))];
      },
      err => console.log(err)
    )
  }

  AddCredential() {
    this.AddCollection = true;
  }

  clearCollection (event) {
    this.AddCollection = false;
    this.getDefaultCredential();
    this.getCollection(this.byDefaultCategory);
    this.getSharedCount();
    this.getCategory();
  }

  search () {
    this.loadingList = true;
    this.credentialService.searchCredential(this.searchForm.value).subscribe(
      res => {
        this.loadingList = false;
        this.credentials = res.response
      },
      err => {

      }
    )
  }

  logout() {
    let dialogRef = this.dialog.open(LogoutComponent, {
      width:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
