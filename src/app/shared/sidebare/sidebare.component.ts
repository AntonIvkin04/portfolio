import { Component, ElementRef, inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenResService } from '../../service/screen-res/screen-res.service';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { DialogSidebarInfoComponent } from '../dialog/dialog-sidebar-info/dialog-sidebar-info.component';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';

@Component({
  selector: 'app-sidebare',
  imports: [CommonModule],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  private scrollY = inject(ScrollYServiceService)
  private screenRes = inject(ScreenResService)
  private langService = inject(LanguageDecService)

  private dialog = inject(Dialog)

  langSubscription: Subscription | undefined
  currentLang: string = '';

  @ViewChildren('spans') spans!: QueryList<ElementRef>;
  @ViewChildren('under') unders!: QueryList<ElementRef>;
  spanWidthCache: number[] = []
  undersIndex: number = 0;
  underlineInit: boolean = true;

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

  }

  ngOnInit() {
    this.scrollY.currentScrollY$.subscribe((x) => {
      this.markCurrentSection(x)
    })

    setTimeout(() => {
      this.screenRes.device$.subscribe((x) => {
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

  ngAfterViewInit() {
    this.changeUnderlineWidth()
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
    if (x <= 480) {
      this.aboutme = true;

      this.skill = false;
      this.project = false;
      this.contact = false;
    }

    if (x >= 480) {
      this.project = true;

      this.aboutme = false;
      this.skill = false;
      this.contact = false;
    }

    if (x >= 1280) {
      this.skill = true;

      this.aboutme = false;
      this.project = false;
      this.contact = false;
    }


    if (x >= 1980) {
      this.contact = true;

      this.project = false;
      this.skill = false;
      this.aboutme = false;
    }
  }

  openModualInfo(type: string) {
    const data = {
      type: type,
      currentLang: this.currentLang,
    }

    this.scrollY.modalOpen = true;

    this.dialog.open(DialogSidebarInfoComponent,
      { data: data, autoFocus: '__non_existing_element__', panelClass: ['slideInDialog-md', 'animateDialog'] })

      .closed.subscribe(x => {
        this.scrollY.modalOpen = false;
      })
  }
}
