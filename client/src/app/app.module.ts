import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GroupInfoComponent } from './group-info/group-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [AppComponent, SidebarComponent, ChatComponent, LoginPageComponent,
     DashboardComponent, UserListComponent, GroupInfoComponent, UserInfoComponent, StartScreenComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,NgMultiSelectDropDownModule.forRoot(),
    PickerModule,HttpClientModule,MatTabsModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatIconModule,
    QRCodeModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
