import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/service/appointment.service';

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
  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService : AppointmentService
  ) {}
  ngOnInit(): void {
    const today = new Date();
    // Set the minimum date to tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
    this.token= localStorage.getItem('token');
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

    console.log('data :',appointmentData)
    this.appointmentService.createAppointment(this.token,appointmentData).subscribe(res=>{
      console.log(JSON.stringify(res));
      if(res.status ==200){
        this.dialogRef.close(appointmentData);
      }
    })
    
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
