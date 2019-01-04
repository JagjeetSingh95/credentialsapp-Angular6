import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  public user: FormGroup;
  userForm:boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private loginFormBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrManager
  ) {
    if(localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')
  }

  ngOnInit() {
    this.user = this.loginFormBuilder.group ({
      email: ['', Validators.compose([Validators.required, CustomValidators.email])]
    } );
  }

  forgotPassword(user) {
    this.userForm = true;
    if (this.user.invalid) {
      return;
    }
    this.loading = true;
    const userDetail = {
      email: user.value.email
    }
    this.authService.forgot(userDetail).subscribe(
      res => {
        this.loading = false;
        this.toastr.successToastr(res.message, 'Success!');
        this.user.reset();
        this.userForm = false;
      },
      err => {
        this.loading = false;
        this.toastr.errorToastr(err.error.message, 'Oops!');
      }
    );
  }
}
