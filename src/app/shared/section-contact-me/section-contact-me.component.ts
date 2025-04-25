import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-contact-me',
  imports: [FormsModule],
  templateUrl: './section-contact-me.component.html',
  styleUrl: './section-contact-me.component.css'
})
export class SectionContactMeComponent {
  constructor() {

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
