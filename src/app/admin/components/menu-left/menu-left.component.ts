import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-menu-left',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatListModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent {

}
