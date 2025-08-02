import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren, signal, Output, EventEmitter } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { HeroAnimationDirective } from '../../directives/hero-animation.directive';
import { elementHeight, Language } from '../types';
import { delay, spawn } from '../util';
import { SectionAboutMeComponent } from "../section-hero/section-about-me/section-about-me.component";
import { SectionHeightDirective } from '../../directives/section-height.directive';

@Component({
  selector: 'app-section-hero',
  imports: [HeroAnimationDirective, SectionAboutMeComponent],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css',
   hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class SectionHeroComponent {

  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined;

  private animationPlay = false;
  
  currentLang: Language = 'de'
  array: [] = [];
  darkmode = signal<boolean>(true)

  info_text: {
    location: {
      de: string
      en: string
    },
    code_info: {
      de: string
      en: string
    }
  } = {
      location: {
        de: 'Biberach an der Riß, Deutschland',
        en: 'Biberach an der Riß, Germany'
      },
      code_info: {
        de: 'Bereit neue Wege des Programmierens kennenzulernen!',
        en: 'Ready to learn new paths at programming!'
      }
    }

  @ViewChildren('shortinfocontainer') infocontainer!: QueryList<ElementRef>
  @ViewChildren('herotext') herotext!: QueryList<ElementRef<HTMLElement>>
  @ViewChildren('svg') svg!: QueryList<ElementRef>
  @ViewChild('code') code!: ElementRef;
  @ViewChild('location') location!: ElementRef;

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngAfterViewInit(){
  }

  async startTextAnimaton() {
    const elements = this.herotext.map((e) => { return e.nativeElement.childNodes })
    if (elements === undefined || this.animationPlay) return

    this.animationPlay = true;
    this.setAnimationVariableTrue()

    for (let i = 0; i < elements.length; i++) {
      for (const element of elements[i]) {
        if (element instanceof HTMLElement) {
          await this.changeElement(element)
        }
      }
    }
  }

  async changeElement(element: HTMLElement) {
    await delay(150)
    element.style.transform = 'translateY(-12px)'
    element.style.color = 'green'
    spawn(async () => {
      await delay(200)
      element.style.transform = 'translateY(0px)'
      element.style.color = ''
    })
  }



  setAnimationVariableTrue() {
    spawn(async () => {
      await delay(400)
      this.animationPlay = false
    })
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()
  }

  showText(id: ElementRef, index: number, width: number) {
    let currentElement = this.infocontainer.get(index)
    let currentSvg = this.svg.get(index)
    currentElement!.nativeElement.style.width = `${width}px`
    setTimeout(() => {
      currentSvg!.nativeElement.style.display = 'none'
      id.nativeElement.style.display = 'block'
      id.nativeElement.style.display = 'block'
      id.nativeElement.classList.add('text-opacity')
    }, 250)
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      this.darkmode.set(true)
      return true
    } else {
      this.darkmode.set(false)
      return false
    }
  }
}
