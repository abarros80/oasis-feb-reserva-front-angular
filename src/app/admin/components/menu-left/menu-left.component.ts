import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-menu-left',
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent {

}
