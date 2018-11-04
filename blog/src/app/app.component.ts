import { Component } from '@angular/core';
import * as firebase from 'firebase' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(){
    var config = {
      apiKey: "AIzaSyAK2HAXoXwM1AtYfWSdIhBSk28BbQ4hwyc",
      authDomain: "blog-59a00.firebaseapp.com",
      databaseURL: "https://blog-59a00.firebaseio.com",
      projectId: "blog-59a00",
      storageBucket: "",
      messagingSenderId: "443064465470"
    };
    firebase.initializeApp(config);
  }


}
