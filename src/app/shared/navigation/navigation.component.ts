import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';
import { ScreenResService } from '../../service/screen-res/screen-res.service';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { Language } from '../types';
import { NavigationService } from '../../service/navigation/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private scrollY = inject(ScrollYServiceService)
  private screenRes = inject(ScreenResService)
  private langService = inject(LanguageDecService)
  private vps = inject(ViewportScroller)
  private navService = inject(NavigationService)

  @ViewChild('navbarmobile') navbarmobile!: ElementRef<HTMLElement>
  navbaropen: boolean = false;

  @ViewChildren('spans') spans!: QueryList<ElementRef>;
  @ViewChildren('under') unders!: QueryList<ElementRef>;
  spanWidthCache: number[] = []
  undersIndex: number = 0;
  underlineInit: boolean = true;

  langSubscription: Subscription | undefined
  currentLang: Language = 'de';

  arrayNav = this.navService.arrayNav
  activeSection: string = ''

  arrayObjHeight = this.navService.arrayHeight
  arrayHeight: number[] = []

  cacheWindowHeight: number = 0;

  scrollToPosition(scrollY: string) {
    this.vps.setOffset([0, 100]);
    this.vps.scrollToAnchor(scrollY)
  }

  ngAfterViewInit() {
    this.scrollY.currentScrollY$.subscribe((x) => {
      this.markCurrentSection(x)
    })

    setTimeout(() => {
      this.activeSection = this.navService.arrayNav[0].name
    }, 10)
  }

  ngOnInit() {

    setTimeout(() => {
      this.screenRes.screenW$.subscribe((x) => {
        console.log(x)
      })
    }, 500)

    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang
      setTimeout(() => {
        this.changeUnderlineWidth()
      })
    })
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()
  }

  changeUnderlineWidth() {
    this.spans.forEach((e) => {
      this.spanWidthCache.push(e.nativeElement.offsetWidth)
    })

    this.unders.forEach((e) => {
      e.nativeElement.style.width = `${this.spanWidthCache[this.undersIndex]}px`;
      this.undersIndex++;
    })

    this.undersIndex = 0;
    this.spanWidthCache = [];
  }

  returnDarkModeClass(dark: boolean) {
    if (dark) {
      return '[class.active-dm]'
    } else {
      return '[class.active]'
    }
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }

  markCurrentSection(x: number) {
    let scrollPercentage = 0;
    const totalSectionsHeight = this.arrayObjHeight.reduce((sum, section) => sum + section.height, 0);

    if (!this.scrollY.modalOpen) {
      this.cacheWindowHeight = totalSectionsHeight
    }

    if (this.scrollY.modalOpen) {
      scrollPercentage = (x / this.cacheWindowHeight) * 100;
    } else {
      scrollPercentage = (x / totalSectionsHeight) * 100;
    }

    if (totalSectionsHeight === 0) {
      return; // Keine Sektionen vorhanden, nichts zu tun.
    }

    // console.log(scrollPercentage)
    let cumulativePercentage = 0;
    for (const section of this.arrayObjHeight) {
      // Berechne, wie viel Prozent der Gesamthöhe diese eine Sektion ausmacht.
      const sectionPercentage = (section.height / totalSectionsHeight) * 100;

      // Prüfe, ob der aktuelle Scroll-Prozentsatz innerhalb der Grenzen dieser Sektion liegt.
      // Die Grenze ist die Summe der vorherigen Prozentsätze plus der aktuellen.
      if (scrollPercentage <= cumulativePercentage + sectionPercentage) {
        this.activeSection = section.section;
        return; // Sektion gefunden, Schleife beenden.
      }

      // Addiere den Prozentsatz der aktuellen Sektion zur kumulativen Summe für die nächste Prüfung.
      cumulativePercentage += sectionPercentage;
    }

    if (this.arrayObjHeight.length > 0) {
      this.activeSection = this.arrayObjHeight[this.arrayObjHeight.length - 1].section;
    }


    //   if (scrollPercentage >= 0 && scrollPercentage < aboutMeEndPercentage) {
    //     this.activeSection = 'about'
    //   } else if (scrollPercentage >= aboutMeEndPercentage && scrollPercentage < projectEndPercentage) {
    //     this.activeSection = 'project'
    //   } else if (scrollPercentage >= projectEndPercentage && scrollPercentage < skillEndPercentage) {
    //     this.activeSection = 'skill'
    //   } else if (scrollPercentage >= skillEndPercentage) {
    //     this.activeSection = 'contact'
    //   }

  }

  toggleNavbarMobile() {
    if (this.navbaropen) {
      this.navbaropen = false;
      this.navbarmobile.nativeElement.classList.remove('nav-mobile-open')
      this.navbarmobile.nativeElement.classList.add('nav-mobile-close')
      setTimeout(() => {
        this.navbarmobile.nativeElement.classList.add('dp-n')
      }, 190)
    } else {
      this.navbaropen = true;
      this.navbarmobile.nativeElement.classList.remove('dp-n')
      this.navbarmobile.nativeElement.classList.add('nav-mobile-open')
      this.navbarmobile.nativeElement.classList.remove('nav-mobile-close')
    }
  }
}
