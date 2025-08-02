import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { ScrollYServiceService } from '../../../service/scroll-y/scroll-y-service.service';
import { ScreenResService } from '../../../service/screen-res/screen-res.service';
import { Subscription } from 'rxjs';
import { Language } from '../../types';

@Component({
  selector: 'app-dialog-privacy-policy',
  imports: [],
  templateUrl: './dialog-privacy-policy.component.html',
  styleUrl: './dialog-privacy-policy.component.css'
})
export class DialogPrivacyPolicyComponent {
  private dialog = inject(Dialog)
  private scrollY = inject(ScrollYServiceService)

  private screenRes = inject(ScreenResService)
  screenResSubscription: Subscription | undefined

  public type: string = ''
  public currentLang: Language = 'de';
  public copied: boolean | any = false;

  constructor(
    @Inject(DIALOG_DATA) public data: {
      type: string,
      currentLang: Language
    },
  ) {
    this.type = this.data.type
    this.currentLang = this.data.currentLang
  }

  text = {
    de: `Gemäß Art. 6 Abs. 1 lit. f DSGVO erfolgt die Verarbeitung personenbezogener Daten (insbesondere E-Mail-Adressen und Inhalte der Kommunikation) auf Grundlage meines berechtigten Interesses an einer funktionierenden und sicheren Kommunikation.
        Alle empfangenen E-Mails werden ausschließlich in meinem persönlichen E-Mail-Postfach gespeichert. Eine Weitergabe, Verarbeitung oder Nutzung durch Dritte findet nicht statt. Es erfolgt keinerlei Übermittlung an externe Dienstleister oder Plattformen.
        Zur Sicherstellung der Integrität und Vertraulichkeit der Daten erfolgt die Speicherung der E-Mails unter Einhaltung technischer und organisatorischer Maßnahmen im Sinne von Art. 32 DSGVO.
        Die empfangenen Nachrichten werden archiviert, um eine lückenlose Dokumentation zu gewährleisten. Die Archivierung erfolgt ausschließlich intern und dient ausschließlich nachvollziehbaren Zwecken (z. B. Nachweispflichten gemäß Art. 5 Abs. 2 DSGVO).
        Betroffene Personen haben gemäß Art. 15 ff. DSGVO jederzeit das Recht auf Auskunft über die gespeicherten Daten, deren Berichtigung, Löschung oder Einschränkung der Verarbeitung.`,

    en: `In accordance with Article 6(1)(f) GDPR, the processing of personal data (in particular email addresses and message content) is based on my legitimate interest in secure and reliable communication.
        All received emails are stored exclusively in my personal email inbox. There is no transmission, further processing, or use of this data by third parties under any circumstances. No data is shared with external service providers or platforms.
        To ensure the integrity and confidentiality of the data, all emails are stored using appropriate technical and organizational measures, as required by Article 32 GDPR.
        Messages are archived for documentation purposes only. This archiving is strictly internal and serves legitimate accountability needs (e.g. obligations under Article 5(2) GDPR).
        Data subjects have the right to request information about their stored data, as well as the right to rectification, erasure, or restriction of processing in accordance with Articles 15 ff. GDPR.`
  }

  close() {
    document.getElementsByClassName("animateDialog")[0].classList.remove("slideInDialog-md");
    document.getElementsByClassName("animateDialog")[0].classList.add("slideOutDialog-md");
    this.scrollY.modalOpen = false;
    setTimeout(() => { this.dialog.closeAll(); }, 400)
  }
}
