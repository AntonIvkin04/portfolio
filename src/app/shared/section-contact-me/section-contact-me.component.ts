import { Component, inject } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-section-contact-me',
  imports: [FormComponent],
  templateUrl: './section-contact-me.component.html',
  styleUrl: './section-contact-me.component.css'
})
export class SectionContactMeComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined;

  currentLang:string = '';

  constructor() {

  }

  ngOnInit(){
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy(){
    this.langSubscription?.unsubscribe();
  }

}
