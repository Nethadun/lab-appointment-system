import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  onSubmit() {
    // Here you would typically perform authentication logic,
    // for the sake of simplicity, let's assume authentication is successful
    // and redirect to another page (e.g., home page)
    this.router.navigate(['/dashboard']);
  }

}
