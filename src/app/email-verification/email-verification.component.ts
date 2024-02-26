import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  otp: string = '';

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }
  verifyOTP() {
    const data = {
      userId:localStorage.getItem('userId'),
      otp:this.otp
    }
    this.authService.verifyOTP(data).subscribe(
      () => {
        console.log('OTP verified successfully.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error verifying OTP:', error);
      }
    );
  }

}
