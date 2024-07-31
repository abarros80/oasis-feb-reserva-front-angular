import {ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, signal} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


import {MatSelectModule} from '@angular/material/select';


import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements AfterViewInit {
  displayedColumns: string[] = ['quarto', 'nome', 'paxadulto', 'paxcrianca', 'datareserva', 'hora', 'hoster',  'observacao', 'horaentrada'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  //
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }


}

export interface PeriodicElement {
  quarto: number;
  nome: string;
  paxadulto: number;
  paxcrianca: number;
  hora: string;
  hoster: string;
  datareserva: string;
  observacao: string;
  horaentrada: string
}
//'quarto', 'nome', 'paxadulto', 'paxcrianca', 'hora', 'hoster', 'datareserva', 'observacao', 'horaentrada'
const ELEMENT_DATA: PeriodicElement[] = [
  {quarto: 1, nome: 'Hydrogen', paxadulto: 2, paxcrianca: 1, hora: '12:00', hoster: 'Daniela', datareserva: '05/08/2024', observacao: 'Xpto Xpto', horaentrada: '19:00'},
  {quarto: 2, nome: 'Hydrogen', paxadulto: 2, paxcrianca: 0, hora: '13:00', hoster: 'Daniela', datareserva: '05/08/2024', observacao: 'Xpto Xpto', horaentrada: '19:00'},
  {quarto: 3, nome: 'Adilson Barros', paxadulto: 3, paxcrianca: 4, hora: '14:00', hoster: 'Joana', datareserva: '05/08/2024', observacao: 'Xpto Xpto', horaentrada: '19:00'}

];


