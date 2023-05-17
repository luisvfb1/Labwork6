import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoApp';
  isSignedIn = false
  isInvalidCredentials = false;
  isInvalidCredentialsSignUp = false;
  isWeakPassword = false;

  constructor(public firebaseService : FirebaseService){}
  ngOnInit(){
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false
  }
  async onSignup(email:string, password:string){
   try{
    await this.firebaseService.signup(email,password)
    if (this.firebaseService.isLoggedIn){
      this.isSignedIn = true
      this.isInvalidCredentialsSignUp = false;
      this.isWeakPassword = false;
    }
    else{
      this.isInvalidCredentialsSignUp = true;
      this.isWeakPassword = true;
      this.isSignedIn = false;
    }
  }
  catch (error:any) {
    if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use' || error.code === 'auth/missing-password') {
      this.isInvalidCredentialsSignUp = true;
      this.isWeakPassword = false;
    
      // Display a specific error message for invalid email
      console.log('Invalid email address');
    } else if(error.code === 'auth/missing-password' || error.code === 'auth/weak-password'){
      this.isWeakPassword = true;
      this.isInvalidCredentialsSignUp = false;
    
    } else{
      // Handle other error cases as needed
      console.log('Sign-in error:', error);
    }
  }
  }
  
  async onSignin(email:string, password:string){
    try{
      await this.firebaseService.signin(email,password)
      if (this.firebaseService.isLoggedIn){
        this.isSignedIn = true
        this.isInvalidCredentials = false;
      }
      else{
        this.isInvalidCredentials = true;
        this.isSignedIn = false;
      }
    }
    catch (error:any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' || error.code === 'auth/missing-password') {
        this.isInvalidCredentials = true;
        this.isSignedIn = false;
        setTimeout(() => {
          window.location.reload(); // Refresh the page after 3 seconds
        }, 3000);
        // Display a specific error message for invalid email
        console.log('Invalid email address');
      } else {
        // Handle other error cases as needed
        console.log('Sign-in error:', error);
      }
    }
    
  }
  handleLogout(){
    this.isSignedIn = false
  }
}
