import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppointmentService } from 'src/app/service/appointment.service';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-view-all-appointment',
  templateUrl: './view-all-appointment.component.html',
  styleUrls: ['./view-all-appointment.component.css']
})
export class ViewAllAppointmentComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'appointmentNumber', 'appointmentDate', 'recommendedDoctor', 'amount', 'serviceCharge', 'totalPay', 'status', 'createDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  token:any
  constructor(private dialog: MatDialog,private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.token= localStorage.getItem('token');
    this.getAllAppointment();
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllAppointment();
    });
  }


  getAllAppointment(){
    this.appointmentService.getAllAppointments(this.token).subscribe(res=>{
      console.log(res)
      this.dataSource.data = res;
    if (res.length > 0) {
      this.displayedColumns = Object.keys(res[0]);
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    })
    
  }
  viewAppointment(element: any) {
    const dialogRef = this.dialog.open(ViewAppointmentComponent, {
      width: '750px',
      data:element
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllAppointment();
    });
  }

}
