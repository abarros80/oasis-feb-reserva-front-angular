import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {

}
