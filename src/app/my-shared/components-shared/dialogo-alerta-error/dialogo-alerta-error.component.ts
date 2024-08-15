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
import { IAlertDialogData } from '../../interfaces-shared/i-alert-dialog-data';

@Component({
  selector: 'app-dialogo-alerta-error',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './dialogo-alerta-error.component.html',
  styleUrl: './dialogo-alerta-error.component.scss'
})
export class DialogoAlertaErrorComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoAlertaErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
