import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  idType: string = 'NIC';
  idNo: string = '';
  name: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Here you would typically perform registration logic
    console.log('Registration form submitted:', this.idType, this.idNo, this.name, this.mobile, this.email, this.password);
  }
}
