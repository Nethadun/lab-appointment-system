import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private appComponent: AppComponent, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.expriedSession();
  }
  ngAfterViewInit(){
    
  }

  expriedSession(){
    localStorage.clear();
  }

  toggleRegistration() {
    this.appComponent.toggleRegistration();
  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          localStorage.setItem('userId',response.id),
          localStorage.setItem('token',response.token),
          localStorage.setItem('userType',response.userType),
          localStorage.setItem('email',response.email),
          // Handle successful login
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle login error
          this.errorMessage = 'Invalid username or password';
          console.error('Login error:', error);
        }
      );
    }
  }

}
