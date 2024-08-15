import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-pagina-nao-encontrado',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './pagina-nao-encontrado.component.html',
  styleUrl: './pagina-nao-encontrado.component.scss'
})
export class PaginaNaoEncontradoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  voltar() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
