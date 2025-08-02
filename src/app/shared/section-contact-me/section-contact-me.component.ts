import { Component, ElementRef, EventEmitter, inject, Output } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { elementHeight, Language } from '../types';
import { SectionHeightDirective } from '../../directives/section-height.directive';
import { DialogPrivacyPolicyComponent } from '../dialog/dialog-privacy-policy/dialog-privacy-policy.component';
import { Dialog } from '@angular/cdk/dialog';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';

@Component({
  selector: 'app-section-contact-me',
  imports: [FormComponent],
  templateUrl: './section-contact-me.component.html',
  styleUrl: './section-contact-me.component.css',
   hostDirectives: [{
        directive: SectionHeightDirective,
        outputs: ['height'],
        inputs: ['sectionid']
      }]
})
export class SectionContactMeComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined;

  currentLang: Language = 'de';
  
  constructor() {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe();
  }
}
