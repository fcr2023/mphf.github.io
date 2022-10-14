import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNewAccount } from './account/new-account-component';
import { AppPrescFilter } from './filter/filter-page.component';
import { AppLogin } from './login/login-page-component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AppLogin,},
  { path: 'filter', component: AppPrescFilter},
  { path: 'newuser', component: AppNewAccount},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
