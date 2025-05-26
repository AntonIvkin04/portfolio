import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() currentLang:string | any;

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Formulardaten:', formData);

    } else {
      console.log('Das Formular ist nicht gültig.');
    }
  }
}
