import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNewAccount } from './account/new-account-component';
import { AppProfile } from './account/profile-component';
import { AppResetAccount } from './account/reset-password-component';
import { AppPrescFilter } from './filter/filter-page.component';
import { AppForgotPassword } from './login/forgot-pwd-component';
import { AppLogin } from './login/login-page-component';
import { AppPrescription } from './prescription/prescription-component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AppLogin,},
  { path: 'filter', component: AppPrescFilter},
  { path: 'newuser', component: AppNewAccount},
  { path: 'forgotpwd', component: AppForgotPassword},
  { path: 'updatepwd', component: AppResetAccount},
  { path: 'new-prescription', component: AppPrescription},
  { path: 'profile', component: AppProfile}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
