import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthService } from '../../service/auth.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', Validators.compose([Validators.required,CustomValidators.equalTo(password)]));

@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetpasswordComponent implements OnInit {
    public user: FormGroup;
    userForm:boolean = false;
    loading: boolean = false;
    confirmpwdequal:boolean = false; 
    token = '';
  
    constructor(
      private authService: AuthService,
      private loginFormBuilder: FormBuilder,
      private route: ActivatedRoute,
      private toastr: ToastrManager
    ) {
        this.route.params.subscribe( params => {
           this.token = params.token;
        });

        if(localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')
    }
  
    ngOnInit() {
      this.user = this.loginFormBuilder.group ({
        password: password,
        confirmPassword: confirmPassword
      } );
    }
  
    confirmPwd() {
      this.confirmpwdequal = true;
    }  
  
    resetPassword(user) {
      this.userForm = true;
      if (this.user.invalid) {
        return;
      }
      this.loading = true;
      const userDetail = {
        password: user.value.password,
        token: this.token
      }
      this.authService.resetPassword(userDetail).subscribe(
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
  