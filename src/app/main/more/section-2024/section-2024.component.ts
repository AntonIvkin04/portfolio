import { Component, inject } from '@angular/core';
import { SectionHeightDirective } from '../../../directives/section-height.directive';
import { LanguageDecService } from '../../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Language } from '../../../shared/types';

@Component({
  selector: 'app-section-2024',
  imports: [],
  templateUrl: './section-2024.component.html',
  styleUrl: './section-2024.component.css',
    hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class Section2024Component {
  langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

  description = {
    de: '2024 begann ich den ersten Schritt in mein neues Kapitel der Entwicklung.<br><br>Ich meldete mich bei der Developer Akdamie für meinen ersten Frontend Kurs an und lernte ab da Javascirpt, Typescript und Angular.<br><br>Ich wusste aber auch schon, ich möchte noch mehr lernen.',
    en: 'In 2024, I took the first step into my new chapter of development.<br><br>I enrolled in the Developer Academy for my first frontend course and started learning JavaScript, TypeScript, and Angular from there.<br><br>But I already knew—I wanted to learn even more.',
  } 

    ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy(){
    this.langSubscription?.unsubscribe()
  }
}
