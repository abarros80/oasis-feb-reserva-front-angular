import { CommonModule, NgIf  } from '@angular/common';
import { Input, Component, OnInit, Output, EventEmitter, inject, ChangeDetectionStrategy } from '@angular/core';
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

@Component({
  selector: 'app-criar-alterar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf,

    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  templateUrl: './criar-alterar.component.html',
  styleUrl: './criar-alterar.component.scss'
})
export class CriarAlterarComponent implements OnInit {

  //DADOS DATA
  currentYear = new Date().getFullYear(); // Set the minimum to January 1st 1 years in the past (Y, M, D)
  minDate = new Date(this.currentYear - 1, 0, 1);
  maxDate = new Date();

  //DADOS HOTEIS
  disableHoteis = false;
  listHoteis = [{id: 1, nome: 'Adilson'}];
  hotelID:number | undefined;

  //DADOS AREAS
  disableAreas = false;
  listaAreas = [{id: 1, nome: 'Adilson'}];
  areaID:number | undefined;

  //DADOS ESPAÇOS
  disableEspacos = false;
  listaEspacos= [{id: 1, nome: 'Adilson'}];
  espacoID:number | undefined;

  //DADOS EQUIPAMENTOS
  disableEquipamentos = false;
  listaEquipamentos= [{id: 1, nome: 'Adilson'}];
  equipamentoID:number | undefined;

  //DADOS TECNICOS
  disableTecnicos = false;
  listaTecnicos= [{id: 1, nome: 'Adilson'}];
  tecnicoID:number | undefined;

  //DADOS TECNICOS
  disableAccoes = false;
  listaAccoes= [{id: 1, nome: 'Adilson'}];
  accaoID:number | undefined;

  //ID DO USER LOGADO
 // readonly USERID = this.loginService.getLoggedInID();


  //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   hasErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

  //CRIAR FORMULARIO
  title = 'FormArray SetValue & PatchValue Example';

  intervencaoForm: FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router



  ) {}

  ngOnInit(): void {

    this.intervencaoForm = this.fb.group({
      hotel: ['', [Validators.required]],
      area: ['', [Validators.required]],
      espaco: ['', [Validators.required]],
      equipamento: ['', [Validators.required]],
      tecnico: ['', [Validators.required]],
      dataHora: ['', [Validators.required]],
      accoes: this.fb.array([])
    });


    this.addAccao();
  }

  closeClick(): void {
    //this.dialogRef.close();

   }

   //RESET FORMULARIO
   onCancel() {
     this.submitted = false;
    // this.formItem.reset(new TipoConjunto());
     console.log('onCancel')
   }


  /** Accoes */
  /*accoes(): FormArray {
    return this.intervencaoForm.get("accoes") as FormArray
  }
*/
  novaAccao(): FormGroup {
    return this.fb.group({
      accao: ['', [Validators.required]],
      duracao: ['', [Validators.required]],
      observacao: '',
    })
  }


  addAccao() {
    this.accoes.push(this.novaAccao());
  }


  removeAccao(accaoIndex: number) {
    this.accoes.removeAt(accaoIndex);
  }


  // GETTERS

  get hotel(): any {
    return this.intervencaoForm.get('hotel');
  }

  get area(): any {
    return this.intervencaoForm.get('area');
  }

  get espaco(): any {
    return this.intervencaoForm.get('espaco');
  }

  get equipamento(): any {
    return this.intervencaoForm.get('equipamento');
  }

  get tecnico(): any {
    return this.intervencaoForm.get('tecnico');
  }

  get dataHora(): any {
    return this.intervencaoForm.get('dataHora');
  }

  get accoes(): FormArray {
    return this.intervencaoForm.get('accoes') as FormArray
  }

  accaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('accao');
  }

  duracaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('duracao');
  }

  observacaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('observacao');
  }








  /*

  // Teachers
  teachers(): FormArray {
    return this.intervencaoForm.get("teachers") as FormArray
  }

  newTeacher(): FormGroup {
    return this.fb.group({
      name: '',
      batches: this.fb.array([])
    })
  }


  addTeacher() {
    this.teachers().push(this.newTeacher());
  }


  removeTeacher(ti: number) {
    this.teachers().removeAt(ti);
  }


  // batches

  batches(ti: number): FormArray {
    return this.teachers().at(ti).get("batches") as FormArray
  }


  newBatch(): FormGroup {
    return this.fb.group({
      name: '',
      students: this.fb.array([])
    })
  }

  addBatch(ti: number) {
    this.batches(ti).push(this.newBatch());
  }

  removeBatch(ti: number, bi: number) {
    this.batches(ti).removeAt(ti);
  }

  // students

  students(ti: number, bi: number): FormArray {
    return this.batches(ti).at(bi).get("students") as FormArray
  }

  newStudent(): FormGroup {
    return this.fb.group({
      name: '',
    })
  }

  addStudent(ti: number, bi: number) {
    this.students(ti, bi).push(this.newStudent());
  }

  removeStudent(ti: number, bi: number, si: number) {
    this.students(ti, bi).removeAt(si);
  }

  */

  onSubmit() {
    console.log(this.intervencaoForm.value);
  }

}
