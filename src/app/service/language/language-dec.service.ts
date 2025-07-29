import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from '../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class LanguageDecService {

  private lang = new BehaviorSubject<Language>('de');
  lang$: Observable<Language> = this.lang.asObservable();
  
  constructor() { }

  setLanguage(lang_string:Language) {
    if (this.lang.value !== lang_string) {
      this.lang.next(lang_string);
    }
  }
  
  isEnglish():boolean {
    return this.lang.value === 'en';
  }

  isGerman():boolean {
    return this.lang.value === 'de';
  }
}
