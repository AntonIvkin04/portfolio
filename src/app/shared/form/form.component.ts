import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { formValue, Language } from '../types';
import { delay } from '../util';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';
import { Dialog } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { DialogPrivacyPolicyComponent } from '../dialog/dialog-privacy-policy/dialog-privacy-policy.component';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {
  @Input() currentLang: Language = 'de';
  @ViewChild('checkboxs') checkbox!: ElementRef<HTMLElement>
  @ViewChild('email') email!: ElementRef<HTMLElement>
  @ViewChild('name') name!: ElementRef<HTMLElement>
  @ViewChild('mail') mail!: ElementRef<HTMLElement>
  @ViewChild('mailSucces') mailSucces!: ElementRef<HTMLElement>

  public scrollY = inject(ScrollYServiceService)

  private dialog = inject(Dialog)
  dialogSubscription: Subscription | undefined

  private http = inject(HttpClient)

  textareaplaceholder: {
    de: string,
    en: string,
  } = {
      de: 'Deine Nachricht mind. 3 Zeichen',
      en: 'Your message atleast 3 Characters'
    }

  mailTest: boolean = false;
  mailSent: boolean = false;
  startTimer: boolean = false;
  validation: boolean = false;
  count: number = 0;
  timeLeft: number = 240;
  interval: ReturnType<typeof setInterval> = setInterval(() => { });

  post = {
    endPoint: 'https://anton-ivkin.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  ngOnInit() {
    if (this.getStartTimer()) {
      this.startTimer = true;
      this.startTimerMail()
    }
  }


  validationFeedback(ngForm: NgForm, type: formValue) {
    if (!ngForm.value[type]) {
      this[type].nativeElement.style.color = '#E23F44'
      this.validation = true;
      setTimeout(() => {
        this[type].nativeElement.style.color = ''
      }, 1000)
      setTimeout(() => {
        this.validation = false;
      }, 1500)
    }

  }

  getStartTimer() {
    if (localStorage.getItem('startTimer') === 'true') {
      return true
    } else {
      return false
    }
  }

  startFormAgain() {
    this.mailSent = false
  }

  checkMailsAlreadySent() {
    if (this.count >= 3) {
      return false
    } else {
      return true;
    }

  }

  startTimerMail() {

    if (!this.getStartTimer()) {
      localStorage.setItem('startTimer', 'true')
    }

    this.startTimer = true
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.startTimer = false
        this.count = 0;
        this.timeLeft = 240;
        localStorage.setItem('startTimer', 'false')
        clearInterval(this.interval)
      }
    }, 1000)
  }

  async startSuccesAnimation(ngForm: NgForm) {
    this.count++;
    this.mail.nativeElement.classList.add('mailSent')
    await delay(600)
    this.mailSent = true;
    await delay(100)
    this.mailSucces.nativeElement.classList.add('mailSentSucces')
    ngForm.resetForm();
  }

  onSubmit(ngForm: NgForm) {
    this.validationFeedback(ngForm, 'checkbox')
    this.validationFeedback(ngForm, 'email')
    this.validationFeedback(ngForm, 'name')

    if (!this.checkMailsAlreadySent() || this.startTimer) {
      if (!this.startTimer) {
        this.startTimerMail()
      }
      return
    }

    if (ngForm.submitted && ngForm.valid && !this.mailTest) {

      let contactData = {
        email: ngForm.value.email,
        name: ngForm.value.name,
        message: ngForm.value.message,
      }

      this.http.post(this.post.endPoint, this.post.body(contactData))
        .subscribe({
          next: (response) => {
            this.startSuccesAnimation(ngForm)
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.startSuccesAnimation(ngForm)
    }
  }

  openModualInfo(type: string) {
    const data = {
      type: type,
      currentLang: this.currentLang,
    }

    this.scrollY.modalOpen = true;

    this.dialogSubscription = this.dialog.open(DialogPrivacyPolicyComponent,
      { data: data, autoFocus: '__non_existing_element__', panelClass: ['slideInDialog-md', 'animateDialog'] })

      .closed.subscribe(x => {
        this.scrollY.modalOpen = false;
      })
  }
}
