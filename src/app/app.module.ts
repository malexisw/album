import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UserStorageComponent } from './user-profil/user-storage/user-storage.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-list/user-single/user-single.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { AngularFireStorageModule, StorageBucket } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore'
import { ImageService } from './services/image.service';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'profil', canActivate: [AuthGuardService], component: UserProfilComponent},
  {path: 'profil/upload', canActivate: [AuthGuardService], component: UserStorageComponent},
  {path: 'users', canActivate: [AuthGuardService],component: UserListComponent},
  {path: 'users/:id', canActivate: [AuthGuardService],component: UserSingleComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    UserProfilComponent,
    UserStorageComponent,
    UserListComponent,
    UserSingleComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAE8yUr-esTOuybI2suRzNDVYHtptkNjWE',
      authDomain: 'my-second-project-eae54.firebaseapp.com',
      databaseURL: 'https://my-second-project-eae54.firebaseio.com',
      projectId: "my-second-project-eae54",
      storageBucket: 'my-second-project-eae54.appspot.com',
      messagingSenderId: '947608656834'
    }),
    AngularFireStorageModule,
  ],
  providers: [
    AngularFirestore,
    AuthService,
    AuthGuardService,
    UserService,
    ImageService,
    { provide: StorageBucket, useValue: "gs://my-second-project-eae54.appspot.com/"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
