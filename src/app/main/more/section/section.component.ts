import { Component, ElementRef, inject, Input, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageDecService } from '../../../service/language/language-dec.service';
import { Language } from '../../../shared/types';
import { SectionHeightDirective } from '../../../directives/section-height.directive';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
  hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class SectionComponent {
  langService = inject(LanguageDecService)
  public element = inject(ElementRef)
  sectionDirective = inject(SectionHeightDirective)

  @Input() description = '';

  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

    ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy(){
    this.langSubscription?.unsubscribe()
  }
}
