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
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule, CriarAlterarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  router: Router = inject(Router);
  readonly dialog = inject(MatDialog);

  isPopupOpened = true;

  addUser() {
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
    this.router.navigate(["./oa-admin/user/criar"])
  }

  navegarParaListar(){
    this.router.navigate(["./oa-admin/user/listar"])
  }

}
