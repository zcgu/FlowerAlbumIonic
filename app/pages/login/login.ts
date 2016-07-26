import {NavController, NavParams, Loading} from 'ionic-angular';
import {Component} from '@angular/core';



@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  private nav: any;
  private login: any;


  constructor(private navCtrl: NavController) {
    this.nav = navCtrl;
    this.login = {};

  }
  
  onLogin() {
    console.log(this.login.username, this.login.password);
    
  }
}
