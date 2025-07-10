import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { ViewportScroller, CommonModule } from '@angular/common'
import { Subscription } from 'rxjs';
import { Language } from '../types';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service'

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dark: boolean = false;
  currentLang: string = '';

  private langservice = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  public scrollY = inject(ScrollYServiceService)
  private vps = inject(ViewportScroller)

  navbaropen = false;

  @ViewChild('navbarmobile') navbarmobile!:ElementRef<HTMLElement>

  cacheWindowHeight: number = 0;
  aboutme: boolean = false;
  skill: boolean = false;
  project: boolean = false;
  contact: boolean = false;

    lang: any = {
    de: {
      aboutme: 'Über mich',
      project: 'Projekte',
      skill: 'Fähigkeiten',
      contact: 'Schreib mir!'
    },
    en: {
      aboutme: 'About me',
      project: 'Projects',
      skill: 'Skills',
      contact: 'Contact me!'
    }
  }

  constructor() {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || this.getLocalStorageDark()) {
      this.dark = true;
    } else {
      this.dark = false;
    }
    this.toggleDarkMode()
  }

  ngOnInit() {
    this.langSubscription = this.langservice.lang$.subscribe(lang => {
      this.currentLang = lang;
    })

    this.scrollY.currentScrollY$.subscribe((x) => {
      this.markCurrentSection(x)
    })
  }

  toggleNavbarMobile(){
    if(this.navbaropen){
      this.navbaropen = false;
      this.navbarmobile.nativeElement.classList.remove('nav-mobile-open')
      this.navbarmobile.nativeElement.classList.add('nav-mobile-close')
    }else{
      this.navbaropen = true;
      this.navbarmobile.nativeElement.classList.add('nav-mobile-open')
      this.navbarmobile.nativeElement.classList.remove('nav-mobile-close')
    }
  }

  scrollToPosition(scrollY: string) {
    this.vps.setOffset([0, 100]);
    this.vps.scrollToAnchor(scrollY)
  }

  ngOnDestroy() {
    if (this.langSubscription) {
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

  onLangChange(lang_string: Language) {
    this.langservice.setLanguage(lang_string)
  }

  markCurrentSection(x: number) {
    const maxScrollY = document.documentElement.scrollHeight;
    let scrollPercentage = 0;

    if (!this.scrollY.modalOpen) {
      this.cacheWindowHeight = maxScrollY
    }

    if (this.scrollY.modalOpen) {
      scrollPercentage = (x / this.cacheWindowHeight) * 100;
    } else {
      scrollPercentage = (x / maxScrollY) * 100;
    }

    const aboutMeEndPercentage = 20;
    const projectEndPercentage = 40;
    const skillEndPercentage = 60;

    if (scrollPercentage >= 0 && scrollPercentage < aboutMeEndPercentage) {
      this.aboutme = true;
      this.skill = false;
      this.project = false;
      this.contact = false;
    } else if (scrollPercentage >= aboutMeEndPercentage && scrollPercentage < projectEndPercentage) {
      this.project = true;
      this.aboutme = false;
      this.skill = false;
      this.contact = false;
    } else if (scrollPercentage >= projectEndPercentage && scrollPercentage < skillEndPercentage) {
      this.skill = true;
      this.aboutme = false;
      this.project = false;
      this.contact = false;
    } else if (scrollPercentage >= skillEndPercentage) {
      this.contact = true;
      this.project = false;
      this.skill = false;
      this.aboutme = false;
    }
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }

}

