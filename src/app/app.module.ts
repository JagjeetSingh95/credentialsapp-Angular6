import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { MainModule } from './main/main.module';

import {
  AuthService,
  AuthGuard,
  CredentialService
} from './service/service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
    MainModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, CredentialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
