import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  user: User;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group( {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const firstName = this.signUpForm.get('firstName').value;
    const lastName = this.signUpForm.get('lastName').value;
    const pseudo = this.signUpForm.get('pseudo').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.user = new User(firstName, lastName, pseudo, email,'',false)
    this.authService.createNewUser(this.user, password).then(
      () => {
        const id = firebase.auth().currentUser.uid;
        this.userService.createNewUser(this.user, id);
        this.router.navigate(['/profil']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
