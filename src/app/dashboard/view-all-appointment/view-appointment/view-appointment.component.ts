import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/service/appointment.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  token:any
  userType:any;
  testData: any[] = [];
  displayedColumns: string[] = ['testId', 'testName', 'testShortName', 'report']; // Define the columns to be displayed

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appointmentService : AppointmentService,) { }

  ngOnInit(): void {
    console.log(this.data)
    this.token= localStorage.getItem('token');
    this.userType= localStorage.getItem('userType');
    this.findTestById();
  }

  findTestById(){
    this.appointmentService.findTestById(this.token, this.data.id).subscribe(res=>{
      console.log(res)
      this.testData = res;
    })
  }

  onFileSelected(event: any, item: any) {
    const file: File = event.target.files[0];

    console.log(item.testId)
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const binaryString: string = reader.result as string;
        const base64Encoded: string = btoa(binaryString);
        console.log(base64Encoded);

        this.appointmentService.uploadTest(this.token,item.testId,base64Encoded).subscribe(res=>{
          console.log(res)
          Swal.fire({
            title: "Good job!",
            text: "Report upload successfully",
            icon: "success"
          });
          
          this.findTestById();
        })
      };
      reader.readAsBinaryString(file);
    }
  }

  downloadReport(item:any){
    console.log(item)

    let base64Encoded = item.report
    let fileName= ''
    const binaryString: string = atob(base64Encoded);

    // Convert binary string to Uint8Array
    const uint8Array: Uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create Blob object
    const blob: Blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create object URL
    const url: string = URL.createObjectURL(blob);

    // Create anchor element
    const anchorElement: HTMLAnchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName;

    // Trigger download
    anchorElement.click();

    // Release object URL
    URL.revokeObjectURL(url);
  }

}
