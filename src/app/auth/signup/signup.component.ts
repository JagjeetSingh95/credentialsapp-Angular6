import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthService } from '../../service/auth.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', Validators.compose([Validators.required,CustomValidators.equalTo(password)]));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: FormGroup;
  userForm:boolean = false;
  loading: boolean = false;
  confirmpwdequal:boolean = false; 

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
      name : ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidators.email])] ,
      password: password,
      confirmPassword: confirmPassword
    } );
  }

  confirmPwd() {
    this.confirmpwdequal = true;
  }  

  signup(user) {
    this.userForm = true;
    if (this.user.invalid) {
      return;
    }
    this.loading = true;
    const userDetail = {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password
    }
    this.authService.signup(userDetail).subscribe(
      res => {
        this.loading = false;
        this.toastr.successToastr(res.msg, 'Success!');
        this.user.reset();
        this.userForm = false;
      },
      err => {
        this.loading = false;
        this.toastr.errorToastr(err.error.msg, 'Oops!');
      }
    );
  }
}
