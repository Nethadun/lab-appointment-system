import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  registrationSuccess: boolean = false;
  confirmPassword: string = '';
  errorMessage: string = '';
  constructor(private appComponent: AppComponent,private router: Router,private authService:AuthService) { 
    this.registerForm = new FormGroup({
      idType: new FormControl('', [Validators.required]),
      idNo: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, this.mobileValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    
  
  }
   mobileValidator(control: AbstractControl): { invalidMobile: boolean } | null {
    const mobileNumber = control.value;
    if (mobileNumber && mobileNumber.toString().length !== 10) {
      return { 'invalidMobile': true };
    }
    return null;
  }

  ngOnInit(): void {
  }

   
  register() {
    const registerData = {
      idType: this.registerForm.value.idType,
      idValue: this.registerForm.value.idNo,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      mobile: this.registerForm.value.mobile,
      password: this.registerForm.value.password
    };
    console.log(registerData)
    this.authService.register(registerData)
      .subscribe(
        (res) => {
          console.log(res)
          localStorage.setItem('userId',res.userId)
          console.log('Registration successful');
          this.appComponent.toggleOTP();
        },
        error => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }
}
