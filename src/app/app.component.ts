import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab-appointment-system';
  showRegistration: boolean = false; 
  showOTP: boolean = false;
  isAuthenticated(): boolean {
    if(localStorage.getItem('token')!=undefined){
      return true;
    }
    return false; // Replace with your authentication check
  }

  toggleRegistration() {
    console.log("workind register : ", !this.showRegistration)
    this.showRegistration = true;
    this.showOTP = false; // Make sure OTP form is hidden when switching to registration
  }

  toggleOTP() {
    this.showOTP = !this.showOTP;
    this.showRegistration = false; // Make sure registration form is hidden when switching to OTP
  }
}
