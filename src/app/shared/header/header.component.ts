import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit(): void {
  }


  salir(){
    localStorage.setItem(environment.tokenVar, '');
    this.router.navigateByUrl('/login');
  }

}
