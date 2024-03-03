import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewAllAppointmentComponent } from './dashboard/view-all-appointment/view-all-appointment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointments', component: ViewAllAppointmentComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  // { 
  //   path: 'dashboard', 
  //   component: DashboardComponent,
  //   children: [
  //     { path: '', redirectTo: 'sidebar', pathMatch: 'full' },
  //     { path: 'appointments', component: ViewAllAppointmentComponent },
  //   ]
  // }, // handle 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
