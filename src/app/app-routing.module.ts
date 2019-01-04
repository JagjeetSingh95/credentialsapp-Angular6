import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { MainComponent } from "./main/main.component";
import { ResetpasswordComponent } from './auth/reset-password/reset-password.component';

import { 
  AuthGuard
} from './service/service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: LoginComponent
  }, 
  {
    path: 'signup',
    component: SignupComponent
  }, 
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetpasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
