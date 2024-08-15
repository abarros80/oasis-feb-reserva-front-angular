import { CommonModule, NgIf  } from '@angular/common';
import { Input, Component, OnInit, Output, EventEmitter, inject, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {MomentDateAdapter} from '@angular/material-moment-adapter';



import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IReserva } from '../../../interfaces/i-reserva';
import { appsettings } from '../../../../../settings/appsettings';
import { DialogService } from '../../../../../my-core/services/dialog.service';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
import { IReqReserva } from '../../../interfaces/i-req-reserva';
import { dataformat } from '../../../../../settings/dataformat';
import moment from 'moment';

//




@Component({
  selector: 'app-criar-alterar',
  standalone: true,
  providers: [
    //{provide: MAT_DATE_FORMATS, useValue: 'pt-PT'},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dataformat },
    //provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,

    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,


    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose

  ],
  templateUrl: './criar-alterar.component.html',
  styleUrl: './criar-alterar.component.scss'
})
export class CriarAlterarComponent implements OnInit {


  //DADOS RESTAURANTES
  disableRestaurantes = false;
  listaRestaurantes = appsettings.restaurantes;
  restauranteID:number | undefined;

  //DADOS QUARTOS
  disableQuartos = false;
  listaQuartos = appsettings.quartos;
  quartoID:number | undefined;

  //NUMERO DE ADULTOS
  disableAdulto = false;
  listaNumAdulto= appsettings.numadultos;
  numAdultoID:number | undefined;

  //NUMERO DE CRIANCA
  disableCrianca = false;
  listaNumCrianca= appsettings.numcriancas;
  numCriancaID:number | undefined;

  //DADOS DATA
  minDate = new Date();
  maxDate = this.addDays(new Date(), 20);
  elementRef: any;

  addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }


  //HORAS
  disableHoras = false;
  listaHoras = appsettings.horas;
  horaID:number | undefined;

  //ID DO USER LOGADO
 // readonly USERID = this.loginService.getLoggedInID();

  //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   hasErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

  //title = 'FormArray SetValue & PatchValue Example';

  //CRIAR FORMULARIO
  reservaForm: FormGroup = {} as FormGroup;

  constructor(private renderer: Renderer2) {}
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private reservaCrudService = inject(ReservaCrudService);
  readonly dialogRef = inject(MatDialogRef<CriarAlterarComponent>);
  readonly data = inject<IReserva>(MAT_DIALOG_DATA);
  //private loginService = inject(LoginService);
  private dialogService = inject(DialogService);

  ngOnInit(): void {

    console.log("COMPONENTE CRIAR/ALTERAR: ngOnInit ===============================");
    this.preencherFormulario();

  }

  //VERIFICA SE O OBJ DATA POSSUI ID (ALTERAR) OU NÃO (CRIAR)
  preencherFormulario(): void {
    let id = this.data.id;

    if(id){
      //ALTERAR
      this.preencherFormularioUpdateFromOBJ(this.data); //com dados da tabela
     }else{
      //CRIAR
       this.preencherFormularioCreate();
     }
   }

   //INCIALIZAR FORM
   preencherFormularioCreate(): void {

    this.accao="Criar";
    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    this.incializarForm();
   }

   //CARREGAR FORM COM DADOS DE OBJECTO, usar ID
   preencherFormularioUpdate(id: number): void {

    console.log("CRIAR/ALTERAR - preencherFormularioUpdate");

    this.accao="Editar";

    this.reservaCrudService.findById(id).subscribe({
      next: (obj) => {
        console.log("CRIAR/ALTERAR RESERVA: ",obj);
        this.updateFormFromOBJ(obj)
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  //CARREGAR FORM COM DADOS DE OBJECTO, usar OBJECTO
  preencherFormularioUpdateFromOBJ(obj: IReserva): void{

    console.log("CRIAR/ALTERAR - preencherFormularioUpdateFromOBJ");

    this.accao="Editar";
    this.updateFormFromOBJ(obj)

    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    console.log("CRIAR/ALTERAR OBJ: ",obj);

  }

  //CRIAR FORMULARIO
  incializarForm(): void {
    this.reservaForm = this.fb.group({
      id: [null],
      restaurante: [null, [Validators.required]],
      quarto: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      paxadulto: [1, [Validators.required]],
      paxcrianca: [0, [Validators.required]],
      datareserva: [new Date(), [Validators.required]],
      hora: [null, [Validators.required]],
      observacao: [''],
    });
  }


  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(obj: IReserva): void{

    this.incializarForm();

    console.log("DATA DO OBJ",obj.datareserva);

    let dateMomentObject = moment(obj.datareserva, "DD/MM/YYYY");
    let dateObject = dateMomentObject.toDate();

    console.log("DATA1: ", dateObject.toLocaleString("pt-PT", {"dateStyle":"short"}));
    console.log("DATA2: ", dateObject.toISOString());

    this.reservaForm?.patchValue({

      id: obj.id,
      restaurante: obj.restaurante,
      quarto: obj.quarto,
      nome: obj.nome,
      paxadulto: obj.paxadulto,
      paxcrianca: obj.paxcrianca,
      datareserva: dateObject.toISOString(),
      hora: obj.hora,
      observacao: obj.observacao,

      });

      //(new Date(obj.datareserva)).toLocaleString("pt-PT", {"dateStyle":"short"})



      //console.log("DATA: ", (new Date(obj.datareserva).toISOString()));

      //this.datareserva = new FormControl(new Date());

  }



  // GETTERS
  get restaurante(): any {
    return this.reservaForm.get('restaurante');
  }

  get quarto(): any {
    return this.reservaForm.get('quarto');
  }

  get nome(): any {
    return this.reservaForm.get('nome');
  }

  get paxadulto(): any {
    return this.reservaForm.get('paxadulto');
  }

  get paxcrianca(): any {
    return this.reservaForm.get('paxcrianca');
  }

  get datareserva(): any {
    return this.reservaForm.get('datareserva');
  }

  get hora(): any {
    return this.reservaForm.get('hora');
  }

  get observacao(): any {
    return this.reservaForm.get('observacao');
  }

  get hoster(): any {
    return this.reservaForm.get('hoster');
  }

  get horaentrada(): any {
    return this.reservaForm.get('horaentrada');
  }



  onSubmit() {

    this.submitted = true;

     //FORM COM DADOS VALIDOS
     if(this.reservaForm?.valid){

      //FAZER UPDATE  -------
      if(this.reservaForm.value.id){

        console.log("ONSUBMIT UPDATE RESERVA");

        let meuobj: IReqReserva = this.crearObjectoFromFROM();

        console.log("updateObjecto", meuobj);

        this.reservaCrudService.updateItemFromIReqReserva(meuobj).subscribe(
              success => {
                console.log('UPDATE RESERVA: sucesso', success);
                this.hasErroMsg = false;

                this.dialogService.openSnack_botao_tempo_css("Sucesso: RESERVA Editado", "X", 6000, "green-snackbar");

                this.dialogRef.close("update");

                this.redirectTo('/oa-admin/rs/listar');
              },
              error => {
                this.hasErroMsg = true;
                this.erroMsg = "UPDATE RESERVA: Erro no Update Reserva \n"+error;
                this.requestCompleto = false;
                console.log(this.erroMsg);



                this.dialogService.alertDialogError(
                  {
                    message: error,
                    buttonText: "Sair",
                  }
                );


              },

              () => {
                console.log('UPDATE RESERVA: request completo');
                this.requestCompleto = true;
              }
        );


      //CRIAR  ----------
      }else{

        console.log("ONSUBMIT CREATE RESERVA");

        let meuobj: IReqReserva = this.crearObjectoFromFROM();

        console.log("crearObjecto", meuobj);

        this.reservaCrudService.createReservaFromIReqReserva(meuobj).subscribe(
              success => {
                console.log('CRIADO RESERVA: sucesso');
                this.hasErroMsg = false;

                this.dialogService.openSnack_botao_tempo_css("Sucesso: Reserva Criado", "X", 6000, "green-snackbar");

                this.dialogRef.close("criar");

                this.redirectTo('/oa-admin/rs/listar');

              },
              error => {
                this.hasErroMsg = true;
                this.erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
                this.requestCompleto = false;
                console.log(this.erroMsg);

                this.dialogService.alertDialogError(
                  {
                    message: error,
                    buttonText: "Sair",
                  }
                );

              },

              () => {
                console.log('CRIAR ITEM: request completo');
                this.requestCompleto = true;
              }
        );

      }

      //FORM INVALIDO
     } else {

          this.hasErroMsg = true;
          this.erroMsg = "formulario invalido";
          this.requestCompleto = false;
          console.log(this.erroMsg);

          this.dialogService.alertDialogError(
            {
              message: this.erroMsg,
              buttonText: "Sair",
            }
          );
     }

  }



  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
  crearObjectoFromFROM(): IReqReserva{
    //let API_URL = environment.API;
    return {

      "id": this.reservaForm?.value.id,
      "restaurante": this.reservaForm?.value.restaurante,
      "quarto": this.reservaForm?.value.quarto,
      "nome": this.reservaForm?.value.nome,
      "paxadulto": this.reservaForm?.value.paxadulto,
      "paxcrianca": this.reservaForm?.value.paxcrianca,
      "hora": this.reservaForm?.value.hora,
      "hoster": "Maria",
      "datareserva": (new Date(this.reservaForm?.value.datareserva)).toLocaleDateString(),
      //"datareserva": Date.parse(this.reservaForm?.value.datareserva).toLocaleString(),
      "observacao": this.reservaForm?.value.observacao,
      "horaentrada": this.reservaForm?.value.hora //ver depois

    }
  }



  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }


  closeClick(): void {
    this.dialogRef.close();
   }

  //RESET FORMULARIO
  onCancel() {
    this.submitted = false;
  // this.formItem.reset(new TipoConjunto());
    console.log('onCancel')
  }


}




