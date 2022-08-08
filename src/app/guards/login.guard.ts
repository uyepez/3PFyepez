import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router){}

  miToken:string='';

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    this.miToken = localStorage.getItem(environment.tokenVar) as string;
    if(this.miToken=='' || this.miToken==null || this.miToken=='undefined' || this.miToken.length < 20 ){
      this.router.navigateByUrl("/login");
      return false;
    }else{
      return true;
    }
  }
  
}
