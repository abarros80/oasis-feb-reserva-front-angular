import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IConfirmDialogData } from '../../interfaces-shared/i-confirm-dialog-data';

@Component({
  selector: 'app-dialogo-confirmacao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrl: './dialogo-confirmacao.component.scss'
})
export class DialogoConfirmacaoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
