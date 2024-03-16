import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewAllAppointmentComponent } from './dashboard/view-all-appointment/view-all-appointment.component';
import { MatTableModule } from '@angular/material/table';
import { CreateAppointmentComponent } from './dashboard/create-appointment/create-appointment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ViewAppointmentComponent } from './dashboard/view-all-appointment/view-appointment/view-appointment.component';
import { MekePaymentComponent } from './dashboard/create-appointment/meke-payment/meke-payment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    EmailVerificationComponent,
    DashboardComponent,
    SidebarComponent,
    ViewAllAppointmentComponent,
    CreateAppointmentComponent,
    ViewAppointmentComponent,
    MekePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  entryComponents: [
    CreateAppointmentComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
