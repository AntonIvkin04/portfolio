import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LanguageDecService } from '../../language-dec.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-contact-me',
  imports: [FormsModule],
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Formulardaten:', formData);

    } else {
      console.log('Das Formular ist nicht gültig.');
    }
  }



}
