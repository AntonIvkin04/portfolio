import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { ViewportScroller, CommonModule } from '@angular/common'
import { Subscription } from 'rxjs';
import { Language } from '../types';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service'
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dark: boolean = false;
  currentLang: string = '';

  private langservice = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  constructor() {
  }

  ngOnInit() {
    this.langSubscription = this.langservice.lang$.subscribe(lang => {
      this.currentLang = lang;
    })

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (this. getSessionStorageSet()) {
        if (this.getSessionStorageDark()) {
          this.dark = true;
        } else {
          this.dark = false;
        }
      } else {
        this.dark = true;
      }
    } else {
      if (this.getSessionStorageDark()) {
        this.dark = true;
      } else {
        this.dark = false;
      }
    }

    this.toggleDarkMode()
  }


  ngOnDestroy() {
      this.langSubscription?.unsubscribe()
  }

  getSessionStorageDark() {
    let x = sessionStorage.getItem("darkmode")
    if (x === "true") {
      return true
    } else {
      return false
    }
  }

  getSessionStorageSet() {
    let x = sessionStorage.getItem("sessionSet")
    if (x === "true") {
      return true
    } else {
      return false
    }
  }

  toggleDarkMode() {
    if (this.dark) {
      sessionStorage.setItem("darkmode", "true")
      sessionStorage.setItem("sessionSet", "true")
      document.documentElement.classList.add("dark")
    }

    if (!this.dark) {
      sessionStorage.setItem("darkmode", "false")
      sessionStorage.setItem("sessionSet", "true")
      document.documentElement.classList.remove("dark")
    }
  }

  checkDarkMode() {
    if (this.dark) {
      this.dark = false;
      this.toggleDarkMode()
    } else {
      this.dark = true;
      this.toggleDarkMode()
    }
  }

  onLangChange(lang_string: Language) {
    this.langservice.setLanguage(lang_string)
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }

}

