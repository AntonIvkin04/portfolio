import { Component } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidebareComponent } from '../../shared/sidebare/sidebare.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-mainpage',
  imports: [MainContentComponent, SidebareComponent, NavbarComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

}
