import { Component, inject } from '@angular/core';
import { SectionHeightDirective } from '../../../directives/section-height.directive';
import { LanguageDecService } from '../../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Language } from '../../../shared/types';

@Component({
  selector: 'app-section-2023',
  imports: [],
  templateUrl: './section-2023.component.html',
  styleUrl: './section-2023.component.css',
    hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class Section2023Component {

  langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

  description = {
    de: '2023 vertiefte ich mein Wissen in der Webentwicklung und Shopsystemen immer mehr.<br><br>Mein Ausbildungsplatz bat mir hier die besten Möglichkeiten kleine Projekte, wie das automatsieren eines Newsletter-Gutscheins versands, umzusetzten<br><br>Mit engerer zusammenarbeit mit unseren Magenot-Entwicker waren meine ersten Einblicke in die Welt der Entwicklung gesetzt.',
    en: 'In 2023, I deepened my knowledge in web development and shop systems more and more.<br><br>My apprenticeship offered me the best opportunities here to implement small projects, such as automating the sending of newsletter vouchers.<br><br>Through closer collaboration with our Magento developers, my first insights into the world of development were set.',
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
