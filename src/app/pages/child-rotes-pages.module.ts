import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from './home/home.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { LoginGuard } from '../guards/login.guard';
import { Router, RouterModule, Routes } from '@angular/router';


const childRoutes: Routes =[
  { path: '', component: HomeComponent, canActivate:[LoginGuard] },
  { path: 'cuenta', component: CuentaComponent, canActivate:[LoginGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
]


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRotesPagesModule { }
