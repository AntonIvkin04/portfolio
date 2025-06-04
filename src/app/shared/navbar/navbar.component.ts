import { Component, inject } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Language } from '../types';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dark: boolean = false;
  currentLang: string = '';

  langservice = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  constructor() {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || this.getLocalStorageDark()) {
      this.dark = true;
    } else {
      this.dark = false;
    }
    this.toggleDarkMode()
  }

  ngOnInit(){
    this.langSubscription = this.langservice.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy(){
    if(this.langSubscription){
      this.langSubscription.unsubscribe()
    }
  }

  getLocalStorageDark() {
    let x = localStorage.getItem("darkmode")
    if (x === "true") {
      return true
    } else {
      return false
    }
  }

  toggleDarkMode() {
    if (this.dark) {
      localStorage.setItem("darkmode", "true")
      document.documentElement.classList.add("dark")
    }

    if (!this.dark) {
      localStorage.setItem("darkmode", "false")
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

  onLangChange(lang_string:Language){
    this.langservice.setLanguage(lang_string)
  }

}

