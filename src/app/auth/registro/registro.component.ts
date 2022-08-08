import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment.prod';
import { RegistroService, registroUser } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

//registro
  registroForm: FormGroup;
  respuestaRegistro: any;
  isSubmitReg: Boolean = false;
  miUsuario: registroUser = <registroUser>{
  }

  constructor( private router: Router, public formBuilder:FormBuilder, private regServ: RegistroService) { 
    this.registroForm = this.formBuilder.group({
      nombreregistro:['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú]*')]],
      telefonoregistro:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      emailregistro:['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      estadoregistro:['', [Validators.required,  Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú ]*')]],
    });
  }

  ngOnInit(): void {
  }

    registrousr(){    
    this.isSubmitReg= true;
    if(this.registroForm.valid){
      //envia a cuenta de usuario
      Swal.fire({
         allowOutsideClick: false,
         title: 'Espere por favor...',
         icon: 'info',
         confirmButtonText: 'Aceptar'
       });
       Swal.showLoading();
       this.miUsuario = this.registroForm.value;
       this.regServ.registro(this.miUsuario).subscribe(resp =>{
          this.respuestaRegistro = resp;
          Swal.close();
          if (this.respuestaRegistro.success == "200") {
            localStorage.setItem(environment.tokenVar, this.respuestaRegistro.token);
            Swal.fire({
             allowOutsideClick: false,
             title: 'Bien Hecho',
             icon: 'success',
             text: `Registro correcto`,
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
             text: this.respuestaRegistro.error_msg,
             confirmButtonText: 'Aceptar',
           });
          }
       })
    }
  }

}
