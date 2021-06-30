import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any;

  constructor(private fireAuth: AngularFireAuth, private router: Router) { 
    this.fireAuth.authState.subscribe(async (testUser) => {
      if(testUser){
        this.user = testUser;
        // this.router.navigate(['/admin/products'])
      }else{
        this.user = null;
      }
    })
  }

  async login(){
    let provider = new firebase.default.auth.GoogleAuthProvider();
    await this.fireAuth.signInWithPopup(provider).then( data => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  async loginWithEmail(email: string, password:string){
    return new Promise<any>((resolve, reject) =>{
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        res => {
          resolve(res);
          this.user = res.user;
          localStorage.setItem('user', JSON.stringify(res.user));

        }, 
        err => reject(err)
      )
    })
  }

  async registerWithFirebase(email: string, password:string, confirmpassword: string){
    if(password.length < 5) {
      return alert('Password must have at least 6 characters');
    }else if (password != confirmpassword){
      return alert('Confirm password incorrect!');
    }else{
      return new Promise<any>((resolve, reject) =>{
        this.fireAuth.createUserWithEmailAndPassword(email, password).then(
          res => {
              resolve(res);
              this.user = res.user;
              localStorage.setItem('user', JSON.stringify(res.user));
            // this.sendEmailVerification();
          }, 
          err => {
            alert(err.message);
          }
        )
      })  
    }
  }

  async logout(){
    await this.fireAuth.signOut();
    localStorage.clear();
    this.user = null;
  }

  get isLoggedIn(): boolean {
    let tempUser = localStorage.getItem('user');
    return tempUser?true:false;
  }
}
