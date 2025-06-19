import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { HeroAnimationDirective } from '../../directives/hero-animation.directive';
import { Language } from '../types';

@Component({
  selector: 'app-section-hero',
  imports: [HeroAnimationDirective],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css'
})
export class SectionHeroComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined;
  currentLang: Language = 'de'

  info_text:{
    location:{
      de:string
      en:string
    },
    code_info:{
      de:string
      en:string
    }
  } = {
    location: {
      de: 'Biberach an der Riß, Deutschland',
      en: 'Biberach an der Riß, Germany'
    },
    code_info:{
      de: 'Bereit neue Wege des Programmierens kennenzulernen!',
      en: 'Ready to learn new paths at programming!'
    }
  } 

  @ViewChildren('shortinfocontainer') infocontainer!:QueryList<ElementRef>
  @ViewChildren('svg') svg!:QueryList<ElementRef>
  @ViewChild('code') code!: ElementRef;
  @ViewChild('location') location!: ElementRef;

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })

  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()

  }

  showText(id: ElementRef, index:number, width:number) {
    let currentElement = this.infocontainer.get(index)
    let currentSvg = this.svg.get(index)
    currentElement!.nativeElement.style.width = `${width}px`
    console.log(currentElement)
    setTimeout(() => {
      currentSvg!.nativeElement.style.display = 'none'
      id.nativeElement.style.display = 'block'
      id.nativeElement.classList.add('text-opacity')
    }, 250)
  }
}
