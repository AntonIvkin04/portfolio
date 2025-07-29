import { Component, inject } from '@angular/core';
import { SectionHeightDirective } from '../../../directives/section-height.directive';
import { LanguageDecService } from '../../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { Language } from '../../../shared/types';

@Component({
  selector: 'app-section-2025',
  imports: [],
  templateUrl: './section-2025.component.html',
  styleUrl: './section-2025.component.css',
  hostDirectives: [{
      directive: SectionHeightDirective,
      outputs: ['height'],
      inputs: ['sectionid']
    }]
})
export class Section2025Component {
  langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

  description = {
    de: 'Jetzt in 2025 verkürzte ich im Februar erfolgreich meine Ausbildung im Bereich E-Commerce.<br><br>Entschied mich aber im September die Fachhochschulreife in einem Jahr im BKFH1 zu erreichen.<br><br>Ich möchte die Mathematik ab nun besser verstehen und in meiner kommenden Zukunft einsetzten können.',
    en: 'Now in 2025, I successfully shortened my apprenticeship in e-commerce in February.<br><br>But in September, I decided to complete my advanced technical college entrance qualification within one year at the BKFH1.<br><br>I want to understand mathematics better from now on and be able to apply it in my future.',
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
