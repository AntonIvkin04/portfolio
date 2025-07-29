import { Component, inject } from '@angular/core';
import { SectionHeightDirective } from '../../../directives/section-height.directive';
import { LanguageDecService } from '../../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Language } from '../../../shared/types';

@Component({
  selector: 'app-section-2022',
  imports: [],
  templateUrl: './section-2022.component.html',
  styleUrl: './section-2022.component.css',
    hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class Section2022Component {
  langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

  description = {
    de: 'September 2022 begann ich meine Ausbildung als Kaufmann im E-Commerce.<br><br>Dort bekamm ich meine ersten Berührungspunkte mit dem Shopsystem Magento.<br>Ich pflegte unsere Produkte und setzte mithilfe des Content Management System erste eigene Seiten auf.',
    en: 'In September 2022, I started my apprenticeship as a merchant in e-commerce.<br><br>There, I had my first contact with the shop system Magento.<br>I maintained our products and created my first own pages using the content management system.',
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
