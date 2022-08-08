import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

//login
  loginForm: FormGroup;
  respuestaLogin: any;
  isSubmitLogin: Boolean = false;

  constructor(private router: Router, public formBuilder:FormBuilder, private logServ: LoginService) { 
    this.loginForm = this.formBuilder.group({
      emaillogin:['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
    });
  }

  ngOnInit(): void {
  }

    loginusr(){    
    this.isSubmitLogin= true;
    if(this.loginForm.valid){
      //envia a cuenta de usuario
      Swal.fire({
         allowOutsideClick: false,
         title: 'Espere por favor...',
         icon: 'info',
         confirmButtonText: 'Aceptar'
       });
       Swal.showLoading();
       
       this.logServ.login(this.loginForm.value['emaillogin']).subscribe( resp =>{
        this.respuestaLogin = resp;
        Swal.close();
         if (this.respuestaLogin.success == "200") {
          localStorage.setItem(environment.tokenVar, this.respuestaLogin.token);
          Swal.fire({
             allowOutsideClick: false,
             title: 'Bien Hecho',
             icon: 'success',
             text: `Login correcto`,
             confirmButtonText: 'Aceptar',

           }).then((result) => {
             if (result.isConfirmed) {
               this.router.navigateByUrl('/home');
             }
           });


         }else{
            Swal.fire({
             title: 'Error',
             icon: 'error',
             text: this.respuestaLogin.error_msg,
             confirmButtonText: 'Aceptar',
           });
         }
       })

    }
  }
}
