import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {User} from '../models/User.model';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

@Injectable()
export class UserService {

  users: User[] = [];
  usersSubject = new Subject<User[]>();

  imageDetailList: AngularFireList<any>;

  constructor() { }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  saveUsers(id: string) {
    firebase.database().ref('/users/' + id).set(this.users);
  }

  getUsers() {
    firebase.database().ref('/users')
      .on('value',(data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
  }

  getProfile(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewUser(newUser: User, id: string) {
    firebase.database().ref('/users/' + id).set({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      pseudo: newUser.pseudo,
      email: newUser.email,
      confidentialité: newUser.confidentialité
    })
    this.emitUsers();
  }
}
