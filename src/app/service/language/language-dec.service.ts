import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageDecService {

  private lang = new BehaviorSubject<string>('de');
  lang$ = this.lang.asObservable();
  constructor() { }

  setLanguage(lang_string:string) {
    if (this.lang.value !== lang_string) {
      this.lang.next(lang_string);
      console.log('Sprache geändert zu:', lang_string);
    }
  }
  isEnglish():boolean {
    return this.lang.value === 'en';
  }

  isGerman():boolean {
    return this.lang.value === 'de';
  }
}
