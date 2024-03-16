import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/service/appointment.service';
import { MekePaymentComponent } from './meke-payment/meke-payment.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  appointmentDate: string = '';
  recommendedDoctor: string = '';
  token:any
  testList:any[]=[];
  selectedTests: number[] = [];
  minDate: any;
  userRole:any;
  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService : AppointmentService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const today = new Date();
    // Set the minimum date to tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
    this.token= localStorage.getItem('token');
    this.userRole =localStorage.getItem('userType')
    this. findllTests();
  }

  onChangeSelectedTests() {
    console.log(this.selectedTests, 'work');
  }

  onSave(): void {
    const appointmentData = {
      appointmentDate: this.appointmentDate,
      recommendedDoctor: this.recommendedDoctor,
      tests: this.selectedTests
    };
    this.appointmentService.createAppointment(this.token,appointmentData).subscribe(res=>{
      if(res.totalPay>0 && this.userRole === 'PATIENT'){
        this.dialogRef.close(appointmentData);
        this.openDialog(res.totalPay);
      }else{
        Swal.fire({
          text: "Appointment date already taken!",
          icon: "info"
        });
      }
    },(error) => {
      // Handle the error here
      console.error('An error occurred:', error);
      Swal.fire({
        text: "Appointment date already taken!",
        icon: "info"
      });
    }
  );
  
    
  }

  openDialog(res:any): void {
    const dialogRef = this.dialog.open(MekePaymentComponent, {
      width: '750px',
      data:res
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  findllTests(){
    this.appointmentService.findAllTests(this.token).subscribe(res=>{
      console.log(res)
      this.testList = res
    })
  }

}
