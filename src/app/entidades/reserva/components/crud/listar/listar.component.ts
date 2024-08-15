import { ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule,FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { MatSelectModule } from '@angular/material/select';


import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { IReserva } from '../../../interfaces/i-reserva';
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
import { Router } from '@angular/router';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
import { DialogService } from '../../../../../my-core/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { CriarAlterarComponent } from '../criar-alterar/criar-alterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';
import { IResponsePageableReserva } from '../../../interfaces/i-response-pageable-reserva';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements AfterViewInit, OnInit {



  ELEMENT_DATA: IReserva[] = [];
  displayedColumns: string[] = ['quarto', 'restaurante', 'nome', 'paxadulto', 'paxcrianca', 'datareserva', 'hora', 'hoster', 'observacao', 'horaentrada', 'acoes'];
  dataSource = new  MatTableDataSource(this.ELEMENT_DATA);

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: MyPages;


  //Numero total de elementos da tabela
  totalElements: number = 0;

  //Tamanho inicial da tabela
  sizeInicial: number = 10;


  //Nome de coluna para ordenar a tabela
  sortColuna: string ="id";
  direccaoOrdem: string = "desc";

  pageSizeOptions: number[] = [5, 10, 20, 30];

  //PAGE_EVENT
  pageEvent?: PageEvent;

  //SORT_EVENT
  sortEvent?: Sort;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  //-----FORM PESQUISA
  submitted = false;

  // CONTROLO POP_UP
  isPopupOpened = true;








  //CRIAR FORMULARIO PESQUISA
  formPesquisa: FormGroup = {} as FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private reservaCrudService: ReservaCrudService,
    private dialogService: DialogService,
    private dialog: MatDialog) {


     }

  //ON_INIT
  ngOnInit(): void {

    this.formPesquisa = this.formBuilder.group({
      opcao: [null],
      texto: [null],
      activo: [true]
    });

    this.readAll();

  }

  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }



  //
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }




  //DIALOG EDITAR
  editarReserva(row: IReserva) {
    let isPopupOpened = true;
    //const contact = this._contactService.getAllContacts().find(c => c.ID === id);
    const dialogRef = this.dialog.open(CriarAlterarComponent, {
      data: row,
      maxWidth: '70vw',
      maxHeight: '80vh',

      width: '70vw',

      disableClose: true
    });

    //ACCAO DEPOIS DE FECHAR DIALOG
    dialogRef.afterClosed().subscribe(
      result => {
        this.isPopupOpened = false;

        if (result === 'update') {
          this.readAll();
        }
      }
    );

  }

  //DIALOG VER
  verReserva(row: IReserva) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(DetalheComponent, {
      data: row,
      maxWidth: '70vw',
      maxHeight: '80vh',

      width: '70vw',

    });

    //ACCAO DEPOIS DE FECHAR DIALOG
    dialogRef.afterClosed().subscribe(
      result => {
        this.isPopupOpened = false;
      }
    );
  }


  //DIALOG CONFIRM DELETE
  deleteReservaDialgo(row: IReserva) {
    let dialogRef$ = this.dialogService.confirmDialog(
      {
        title: "Remover Reserva?",
        message: "Nome: " + row.nome,
        confirmText: "Sim",
        cancelText: "Não",
      }
    );

    dialogRef$.subscribe(result => {
      console.log("Dialog result: ", result);

      if (result) {
        this.deleteReserva(row);
      }
    });
  }

  deleteReserva(row: IReserva) {




    this.reservaCrudService.deleteData(row.id).subscribe(
      success => {
        this.dialogService.openSnack_botao_tempo_css("Sucesso: RESERVA Removido", "X", 6000, "green-snackbar");

        this.redirectTo('/oa-admin/rs/listar');
      },
      error => {

        this.dialogService.alertDialogError(
          {
            message: error,
            buttonText: "Sair",
          }
        );
      },

      () => {
        console.log('DELETE RESERVA completo');
        this.requestCompleto = true;
      }
    );


    //this.dialogService.openSnack_botao_tempo_css("Sucesso delete hotel "+row.nome, "X", 6000, "green-snackbar");

    //this.dialogService.openSnack_botao_tempo_css("Erro no delete","X", 3000, "red-snackbar")

  }


  //CARREGA LISTA
  readAll() {

   console.log("RESERVA OBJ ", this.getOpcao.value);

    this.carregando = true;

    let myObservablePesquisa$: Observable<IResponsePageableReserva> = this.selecionar_pesquisa();

    myObservablePesquisa$.subscribe({
      next: (data: IResponsePageableReserva) => {
        console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, RESERVA: ', data._embedded.reservas);
        this.dataSource.data = data._embedded.reservas;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        this.carregando = false;

        console.log('COMPONENTE LISTAR - TotalElements: ', this.totalElements);
      },
      error: error => {
        console.error('COMPONENTE LISTAR - ERROR: ', error);
        this.erroMsg = error;
        this.haErroMsg = true;
        this.carregando = false;

        this.alertDialogError(error);

      },
      complete: () => { this.requestCompleto = true; }
    }
    );
  }

  //Devolve o tipo de pesquisa consoante select do formulario
  selecionar_pesquisa(): Observable<IResponsePageableReserva> {


    //PAGINAÇÃO
    let pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    let pageSize = this.pageEvent ? this.pageEvent.pageSize : this.sizeInicial;

    //SORT
    //this.sort = this.sortEvent? this.sortEvent.active : "nomePt";
    this.direccaoOrdem = this.sortEvent ? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableReserva>;//commentar

    myObservablePesquisa$ = this.reservaCrudService.findAll(pageIndex, pageSize, this.sortColuna, this.direccaoOrdem);
    /*
        myObservablePesquisa$ = this.hotelCrudService.findAll(pageIndex, pageSize, this.sortColuna, this.direccaoOrdem);



        console.log("selecionar_pesquisa -- ", this.formPesquisa.value.opcao);
        console.log("selecionar_pesquisa -- ", this.formPesquisa.value.texto);
        console.log("selecionar_pesquisa -- ", this.formPesquisa.value.activo);

        if(this.formPesquisa.value.opcao === "Nome" && this.formPesquisa.value.texto && this.submitted){
          myObservablePesquisa$ = this.hotelCrudService.findByNomeContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sortColuna, this.direccaoOrdem)
        }else
        if(this.formPesquisa.value.opcao === "Telefone" && this.formPesquisa.value.texto && this.submitted){
          myObservablePesquisa$ = this.hotelCrudService.findByTelefoneContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sortColuna, this.direccaoOrdem)
        }else
        if(this.formPesquisa.value.opcao === "Email" && this.formPesquisa.value.texto && this.submitted){
          myObservablePesquisa$ = this.hotelCrudService.findByEmailContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sortColuna, this.direccaoOrdem)
        }else
        if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
          myObservablePesquisa$ = this.hotelCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sortColuna, this.direccaoOrdem)
        }else if(this.submitted){
          myObservablePesquisa$ = this.hotelCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sortColuna, this.direccaoOrdem);
        }else{
          myObservablePesquisa$ = this.hotelCrudService.findAll(pageIndex, pageSize, this.sortColuna, this.direccaoOrdem);
        }

        */
    return myObservablePesquisa$;

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  disabledBotaoPesquisa: boolean = true;
  //ON_CHANCHE_HOTEL: boolean = false;

  mudarEstadoBotaoPesquisa() {

    if (this.formPesquisa.value.opcao === "Todos")
      this.disabledBotaoPesquisa = false; //activar
    else if (this.formPesquisa.value.opcao && this.formPesquisa.value.texto) {
      this.disabledBotaoPesquisa = false; //activar
    } else {
      this.disabledBotaoPesquisa = true; //desactivar
    }

  }


  //ONSUBMIT PESQUISA
  onSubmit() {
    this.submitted = true;
    this.readAll();
    this.submitted = false;
  }

  //LIMPAR CAMPOS FORM
  limparPesquisa() {
    this.submitted = false;
    this.disabledBotaoPesquisa = true; //desactivar
    this.formPesquisa.reset();
  }




  alertDialogError(msg: string) {
    this.dialogService.alertDialogError(
      {
        message: msg,
        buttonText: "Sair",
      }
    );
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  //METODOS GETs
  get getOpcao(): any {
    return this.formPesquisa?.get('opcao');
  }

  get getTexto(): any {
    return this.formPesquisa?.get('texto');
  }

  get getActivo(): any {
    return this.formPesquisa?.get('activo');
  }




}




