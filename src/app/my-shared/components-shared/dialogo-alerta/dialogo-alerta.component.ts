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
import { IAlertDialogData } from '../../interfaces-shared/i-alert-dialog-data';

@Component({
  selector: 'app-dialogo-alerta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './dialogo-alerta.component.html',
  styleUrl: './dialogo-alerta.component.scss'
})
export class DialogoAlertaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoAlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
