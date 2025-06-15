import { Component, inject } from '@angular/core';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-about-me',
  imports: [],
  templateUrl: './section-about-me.component.html',
  styleUrl: './section-about-me.component.css'
})
export class SectionAboutMeComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang: string = '';

  public texts = {
    de: {
      about: 'Hallo! Mein Name ist Anton, ich bin 21 Jahre alt und begeistere mich für Computertechnik jeder Art. Schon lange wollte ich programmieren lernen, wusste aber nie, wo ich anfangen sollte. Mit 19 Jahren habe ich mich dann entschieden, eine Frontend-Weiterbildung zu beginnen.'
    },
    en: {
      about: "Hi! My name is Anton, I'm 21 years old, and I'm passionate about all kinds of computer technology. I've wanted to learn programming for a long time but never knew where to start. When I was 19, I decided to begin a frontend development course."
    }
  }

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()
  }

}
