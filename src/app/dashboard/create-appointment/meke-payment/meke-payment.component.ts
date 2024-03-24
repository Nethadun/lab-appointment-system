import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meke-payment',
  templateUrl: './meke-payment.component.html',
  styleUrls: ['./meke-payment.component.css']
})
export class MekePaymentComponent implements OnInit {
  amountToPay: number = 0; // Example amount

  paymentForm: FormGroup;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.amountToPay = this.data
  }

  processPayment() {
    if (this.paymentForm.valid) {
     Swal.fire({
      title: "Good job!",
      text: "Your payment successfully done!",
      icon: "success"
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Invaild inputs1",
      })
      // Optionally, you can mark all fields as touched to display error messages immediately
      this.paymentForm.markAllAsTouched();
    }
  }

}
