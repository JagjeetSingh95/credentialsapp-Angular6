import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as gobalUrl from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private credentialUrl = gobalUrl.commonUrl + 'credential';
  private defalutCredentialUrl = gobalUrl.commonUrl + 'credential/default';
  private shareUrl = gobalUrl.commonUrl + 'share';
  private usersUrl = gobalUrl.commonUrl + 'auth/users';
  private categoryUrl = gobalUrl.commonUrl + 'credential/category';

  public accesstoken: any;
  public headers: any;

  constructor(private http: HttpClient) { 
  }

  public getCredential(): Observable<any>{
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.credentialUrl, {headers: this.headers});
  }

  public searchCredential(search): Observable<any>{
    console.log(search, "search")
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.credentialUrl + "/search?search=" + search.search, {headers: this.headers});
  }

  public postCredential(data): Observable<any>{
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.post(this.credentialUrl, data, {headers: this.headers});
  }

  public deleteCollection(id): Observable<any>{
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.delete(this.credentialUrl + '/' + id, {headers: this.headers});
  }

  public updateCollection(id, data): Observable<any>{
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.put(this.credentialUrl + '/' + id, data, {headers: this.headers});
  }

  public getDefalutCredential(): Observable<any>{ 
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.defalutCredentialUrl, {headers: this.headers});
  }

  public getSharedData(): Observable<any>{ 
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.shareUrl, {headers: this.headers});
  }

  public postSharedData(user_id, sharedBy, credentialId): Observable<any>{ 
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.post(this.shareUrl, {user_id, sharedBy, credentialId}, {headers: this.headers});
  }

  public getUsersData(): Observable<any>{ 
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.usersUrl, {headers: this.headers});
  }

  public getCategory(): Observable<any>{ 
    this.accesstoken = JSON.parse(localStorage.getItem('currentUser')).access_token;
    this.headers = {Authorization: `Bearer ${this.accesstoken}`}

    return this.http.get(this.categoryUrl, {headers: this.headers});
  }
}
