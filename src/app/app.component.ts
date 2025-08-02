import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainContentComponent } from './main/main-content/main-content.component';
import { SidebareComponent } from './shared/sidebare/sidebare.component';
import { FooterComponent } from './shared/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, RouterModule, SidebareComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'portfolio';
  demo:boolean = true;
}
