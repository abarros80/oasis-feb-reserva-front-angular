import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { MenuTopComponent } from "./components/menu-top/menu-top.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { MenuLeftComponent } from "./components/menu-left/menu-left.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuTopComponent, MainComponent, FooterComponent, MenuLeftComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
