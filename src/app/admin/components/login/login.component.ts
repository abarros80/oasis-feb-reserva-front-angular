import { CommonModule, NgIf  } from '@angular/common';
import { Input, Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule,FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';



import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf,

    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {






  //VARIAVEIS para controlo
  submitted = false;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;
  accao: string = "Criar";

  usernameOrEmail?: string;
  password?: string;


  hide = true;

  formLogin: FormGroup = {} as FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}



  ngOnInit(): void {
    //CRIAR FORMULARIO
  this.formLogin= this.formBuilder.group({
    usernameOrEmail: [this.usernameOrEmail, Validators.required],
    password: [this.password, Validators.required]
  });
  }



  get getUsernameOrEmail(): any {
    return this.formLogin.get('usernameOrEmail');
  }

  get getPassword(): any {
    return this.formLogin.get('password');
  }


  //ONSUBMIT
  onSubmit() {

    this.submitted = true;

    console.log("form-login: ",this.formLogin.value);

    if(this.formLogin.valid){

      this.router.navigate(['/oa-admin/']);


    } else {
      console.log("formulario invalido");
      this.haErroMsg = true;
      this.erroMsg = "Preencher campos corretamente";
    }

   }


   //PREPARAR O OBJECTO PARA SER ENVIADO
  crearObjecto(){
    //let API_URL = environment.API;
    return {
      "usernameOrEmail": this.formLogin.value.usernameOrEmail,
      "password": this.formLogin.value.password
    }
  }

}
