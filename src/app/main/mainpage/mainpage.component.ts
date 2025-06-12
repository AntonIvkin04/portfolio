import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidebareComponent } from '../../shared/sidebare/sidebare.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ScreenResService } from '../../service/screen-res/screen-res.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  imports: [MainContentComponent, SidebareComponent, NavbarComponent, FooterComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {
  private screenService = inject(ScreenResService)
  private screenWsubscription: Subscription | undefined;

  @ViewChild('sidebare', { read: ElementRef }) sidebare!: ElementRef;

  constructor() {

  }

  ngAfterViewInit() {
    this.subscribeWindowWidth()
  }

  subscribeWindowWidth() {
    this.screenWsubscription = this.screenService.screenW$.subscribe((w) => {
      if (w < 1141) {
        this.sidebare.nativeElement.classList.add('sidebar-animation-back')
        this.sidebare.nativeElement.classList.remove('sidebar-animation-forward')
      }

      if(w > 1141){
        this.sidebare.nativeElement.classList.remove('sidebar-animation-back')
        this.sidebare.nativeElement.classList.add('sidebar-animation-forward')
      }
    })
  }

}

