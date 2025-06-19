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
  private firstload: boolean = false;

  @ViewChild('sidebare', { read: ElementRef }) sidebare!: ElementRef;

  constructor() {

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.screenWsubscription?.unsubscribe()
  }

  ngAfterViewInit() {
    this.screenWsubscription = this.screenService.screenW$.subscribe((w) => {
      if (this.firstload) {
        this.displaySidebare(w)
        this.sidebare.nativeElement.classList.remove('sidebare')
      }
    })
    setTimeout(() => {this.firstload = true}, 100)
  }

  displaySidebare(w: number) {
    if (w < 1141) {
      this.sidebare.nativeElement.classList.add('sidebar-animation-back')
      this.sidebare.nativeElement.classList.remove('sidebar-animation-forward')
    }

    if (w > 1141) {
      this.sidebare.nativeElement.classList.remove('sidebar-animation-back')
      this.sidebare.nativeElement.classList.add('sidebar-animation-forward')
    }
  }

}

