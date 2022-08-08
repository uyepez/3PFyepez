import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { CalificacionService, Materia } from '../../services/calificacion.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

    //materia
  formMateria: FormGroup;
  isSubmitMat:boolean = false;
  nuevaMateria: Materia = <Materia>{ id:0 };
  materiaModifica: Materia = <Materia>{ };
  materias: Materia[] = [];

  miToken: string = '';

  constructor( public formBuilder:FormBuilder, private materiaService: CalificacionService) { 

    this.formMateria = this.formBuilder.group({
      alumno:[''],
      materia:['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú]*')]],
      calificacion:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],

    });

  }

  ngOnInit(): void {    
    this.cargaIniciales();
  }

  cargaIniciales(){
    this.miToken = localStorage.getItem(environment.tokenVar) as string;
    this.formMateria.patchValue({alumno : this.miToken});
    this.listaDeMaterias();
    console.log('token', this.miToken);
  }

   registroMat(){
    this.isSubmitMat = true;
    if(this.formMateria.valid){

      this.nuevaMateria = this.formMateria.value;
      this.materiaService.nuevaMateria(this.nuevaMateria);
      this.materias = this.materiaService.cargaMaterias(this.miToken);

      $("#exampleModal").modal("hide");

      Swal.fire({
         //allowOutsideClick: false,
         title: 'Materia Registrada',
         icon: 'success',
         confirmButtonText: 'Aceptar'
       });
    }
  }

  listaDeMaterias(){
    this.materias = this.materiaService.cargaMaterias(this.miToken);
    
  }

  eliminaMateria(id: number, alumno:string){
    this.materias = this.materiaService.eliminaMateria(id, alumno);
  }

  popActualiza(id: number, materia:string) {
    //console.log(id);
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      input: 'number',
      text: `Modifica calificacion de ${materia}`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        console.log('idProd: ',id);
        console.log('nuevaCalif: ', result.value);
        this.actualizaMatera(id, result.value);
        
      }
    });
  }


  actualizaMatera(id:number, nuevaCalificacion:number){
    this.materiaModifica = this.materias[this.materias.findIndex(item => item.id == id)]
    this.materiaModifica.calificacion = nuevaCalificacion;
    console.log(this.materiaModifica);     
    this.materias = this.materiaService.modificaMaeria(this.materiaModifica)
  }
}
