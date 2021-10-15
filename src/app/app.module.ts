import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardServiceService } from './auth-guard-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BBankComponent } from './bbank/bbank.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationGuard } from './authentication.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', component: BBankComponent },
  {
    path: 'dasboard',
    component: AdminDashboardComponent,
  },
  { path: 'home', component: AppComponent, canActivate: [AuthenticationGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BBankComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuardServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
