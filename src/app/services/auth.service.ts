import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/User.model';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor() { }

    createNewUser(user: User, password: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(user.email, password).then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }

    signInUser(email: string, password: string) {
      return new Promise(
        (resolve, reject) => {
         firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve()
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
      firebase.auth().signOut();
  }

}
