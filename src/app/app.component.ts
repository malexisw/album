import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyAE8yUr-esTOuybI2suRzNDVYHtptkNjWE',
      authDomain: 'my-second-project-eae54.firebaseapp.com',
      databaseURL: 'https://my-second-project-eae54.firebaseio.com',
      projectId: "my-second-project-eae54",
      storageBucket: 'my-second-project-eae54.appspot.com',
      messagingSenderId: '947608656834'
    };

    firebase.initializeApp(firebaseConfig);

  }

  ngOnInit() {

  }
}
