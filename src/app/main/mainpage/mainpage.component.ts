import { Component } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidebareComponent } from '../../shared/sidebare/sidebare.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-mainpage',
  imports: [MainContentComponent, SidebareComponent, NavbarComponent, FooterComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {

  constructor(){
  }

  test(){
    console.log('test')
  }

   onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    console.log('Element gescrollt!', element.scrollTop, element.scrollHeight, element.clientHeight);

    // Beispiel: Funktion aufrufen, wenn der Nutzer das Ende erreicht hat
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      console.log('Ende des Containers erreicht!');
    }
  }
  }

