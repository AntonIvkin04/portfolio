import { Component, ElementRef, inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
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
  public scrollY = inject(ScrollYServiceService)
  private screenRes = inject(ScreenResService)
  private langService = inject(LanguageDecService)
  private vps = inject(ViewportScroller)

  private dialog = inject(Dialog)
  dialogSubscription: Subscription | undefined

  langSubscription: Subscription | undefined
  currentLang: string = '';

  @ViewChildren('spans') spans!: QueryList<ElementRef>;
  @ViewChildren('under') unders!: QueryList<ElementRef>;
  spanWidthCache: number[] = []
  undersIndex: number = 0;
  underlineInit: boolean = true;

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

  cacheWindowHeight:number = 0;
    
  aboutme: boolean = false;
  skill: boolean = false;
  project: boolean = false;
  contact: boolean = false;

  constructor() {

  }
  
  scrollToPosition(scrollY:string){
    this.vps.setOffset([0, 100]);
    this.vps.scrollToAnchor(scrollY)
  }

  ngOnInit() {
    this.scrollY.currentScrollY$.subscribe((x) => {
      this.markCurrentSection(x)
    })

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
    this.dialogSubscription?.unsubscribe()
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
  const maxScrollY = document.documentElement.scrollHeight;
  let scrollPercentage = 0;

  if(!this.scrollY.modalOpen){
    this.cacheWindowHeight = maxScrollY
  }

  if(this.scrollY.modalOpen){
     scrollPercentage = (x / this.cacheWindowHeight) * 100;
  }else{
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
