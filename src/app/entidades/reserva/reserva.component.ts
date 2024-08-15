import { Component, inject  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet, Router } from '@angular/router';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


import { CriarAlterarComponent } from './components/crud/criar-alterar/criar-alterar.component';


@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule, CriarAlterarComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {

  router: Router = inject(Router);
  readonly dialog = inject(MatDialog);

  isPopupOpened = true;

  addContact() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CriarAlterarComponent, {
      data: {},
      maxWidth: '70vw',
      maxHeight: '80vh',

      width: '70vw',

      disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }


  navegarParaCriar(){
    this.router.navigate(["./oa-admin/rs/criar"])
  }

  navegarParaListar(){
    this.router.navigate(["./oa-admin/rs/listar"])
  }

}
