import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
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
