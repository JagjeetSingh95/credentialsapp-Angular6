import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/content-loader';

import { MaterialModule } from '../material.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CredentialListComponent } from './credential-list/credential-list.component';
import { CredentialDetailComponent } from './credential-detail/credential-detail.component';
import { DeleteComponent } from './credential-detail/dailog-delete.component';
import { ShareComponent } from './credential-detail/dialog-share.component';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    ContentLoaderModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  entryComponents: [DeleteComponent,ShareComponent, LogoutComponent],
  declarations: [MainComponent, LogoutComponent, ShareComponent, DeleteComponent, SidebarComponent, CredentialListComponent, CredentialDetailComponent]
})
export class MainModule { }
