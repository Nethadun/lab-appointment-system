import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  otp: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  verifyOTP() {
    // Call a method in the auth service to verify the OTP
    this.authService.verifyOTP(this.otp).subscribe(
      () => {
        console.log('OTP verified successfully.');
        // You can add further logic here, such as redirecting the user to a success page
      },
      (error) => {
        console.error('Error verifying OTP:', error);
        // You can handle errors here, such as displaying an error message to the user
      }
    );
  }

}
