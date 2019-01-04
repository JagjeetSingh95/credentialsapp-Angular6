import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  userForm:boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private loginFormBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrManager
  ) { 
    if(localStorage.getItem('currentUser')) this.router.navigate(['/'])
  }

  ngOnInit() {
    this.user = this.loginFormBuilder.group ({
      email: ['', Validators.compose([Validators.required, CustomValidators.email])] ,
      password: ['' , Validators.compose ( [ Validators.required ] )]
    } );
  }

  login (user) {
    this.userForm = true;
    if (this.user.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(user.value).subscribe(
      res => {
        this.loading = false;
        localStorage.setItem('currentUser', JSON.stringify({ access_token: res.token, email: res.email, expTime: res.expTime, name: res.name }));
        this.toastr.successToastr('Welcome '+res.email, 'Success!');
        this.router.navigate(['/']);
      },
      err => {
        this.loading = false;
        this.toastr.errorToastr(err.error.msg, 'Oops!');
      }
    );
  }

}
