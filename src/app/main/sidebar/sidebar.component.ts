import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  email: String;
  name: String;
  @Input() collectionCount: Number;
  @Input() sharedCollectionCount: Number;
  @Input() categoryLists: [];
  @Output() collection = new EventEmitter();
  @Output() sharedCollection = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
  }

  collections (value) {
    this.collection.emit(value);
  }
  sharedCollections () {
    this.sharedCollection.emit();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }
}
