import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credential-list',
  templateUrl: './credential-list.component.html',
  styleUrls: ['./credential-list.component.scss']
})
export class CredentialListComponent implements OnInit {
  @Input() lists: [];
  @Input() loadingList: boolean;
  @Input() categoryLists: [];
  @Output() setId = new EventEmitter();
  @Output() collection = new EventEmitter();
  @Output() getCollection = new EventEmitter();
  @Output() sharedCollection = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  collections () {
    this.collection.emit();
  }
  sharedCollections () {
    this.sharedCollection.emit();
  }

  listDetail(id) {
    this.setId.emit(id);
  }

  getCollections (value) {
    this.getCollection.emit(value);
  }

}
