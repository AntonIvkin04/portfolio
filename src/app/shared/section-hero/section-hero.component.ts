import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { HeroAnimationDirective } from '../../directives/hero-animation.directive';

@Component({
  selector: 'app-section-hero',
  imports: [HeroAnimationDirective],
  templateUrl: './section-hero.component.html',
  styleUrl: './section-hero.component.css'
})
export class SectionHeroComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang: string = '';

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

  showText(id: ElementRef, text: string, index:number, width:number) {
    let currentElement = this.infocontainer.get(index)
    let currentSvg = this.svg.get(index)
    currentElement!.nativeElement.style.width = `${width}px`
    setTimeout(() => {
      currentSvg!.nativeElement.style.display = 'none'
      id.nativeElement.innerText = text
      id.nativeElement.classList.add('text-opacity')
    }, 250)
  }
}
