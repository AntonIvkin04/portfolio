import { Component, ElementRef, inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ScreenResService } from '../../service/screen-res/screen-res.service';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { DialogSidebarInfoComponent } from '../dialog/dialog-sidebar-info/dialog-sidebar-info.component';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';
import { NavigationComponent } from "../navigation/navigation.component";
import { Language } from '../types';

@Component({
  selector: 'app-sidebare',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  public scrollY = inject(ScrollYServiceService)
  private langService = inject(LanguageDecService)

  private dialog = inject(Dialog)
  dialogSubscription: Subscription | undefined

  langSubscription: Subscription | undefined
  currentLang:Language = 'de';

  constructor() {

  }

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang
    })
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()
    this.dialogSubscription?.unsubscribe()
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }

  openModualInfo(type: string) {
    const data = {
      type: type,
      currentLang: this.currentLang,
    }

    this.scrollY.modalOpen = true;

    this.dialogSubscription = this.dialog.open(DialogSidebarInfoComponent,
      { data: data, autoFocus: '__non_existing_element__', panelClass: ['slideInDialog-md', 'animateDialog'] })

      .closed.subscribe(x => {
        this.scrollY.modalOpen = false;
      })
  }
}
