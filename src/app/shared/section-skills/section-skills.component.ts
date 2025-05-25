import { Component, inject } from '@angular/core';
import { SkillIconsMarqueeComponent } from '../skill-icons-marquee/skill-icons-marquee.component';
import { LanguageDecService } from '../../language-dec.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-skills',
  imports: [SkillIconsMarqueeComponent],
  templateUrl: './section-skills.component.html',
  styleUrl: './section-skills.component.css'
})

export class SectionSkillsComponent {
  private langService = inject(LanguageDecService)
  langSubscription:Subscription | undefined;
  currentLang:string = '';

  texts = {
    de: {
      skill: `  Meine Weiterbildung (seit 2023) an der Developer Akademie verschaffte mir eine solide technologische
                Basis.
                Ich startete mit <i>HTML</i>, <i>CSS</i> und <i>JavaScript</i> (Projekt <a>Kochwelt</a>), vertiefte
                API-Anfragen (<a>PokeDex</a>), und erweiterte meine JavaScript-Fähigkeiten in <i>Datenbankabfragen</i>
                und Echtzeitdarstellungen (<a>Join</a>).
                <i>Objektorientiertes Programmieren</i> setzte ich mit dem Browserspiel <a>Yureis Wish</a> um.
                Derzeit konzentriere ich mich auf <i>Angular</i> und <i>Tailwind</i>, wobei mich das komponentenbasierte
                Programmieren wegen seiner Flexibilität besonders fasziniert, wie auch an dieser
                <a>Portfolio-Webseite</a> ersichtlich.
                <br><br>
                Die Möglichkeiten des Webbrowsers sind so groß: Heutzutage kann man darin umfangreiche Applikationen
                entwickeln, was viele Anwendungsbereiche und mobiles Arbeiten ermöglicht.`
    },
    en: {
      skill: `<p>My continuing education (since 2023) at the Developer Akademie provided me with a solid technological basis.
              I started with <i>HTML</i>, <i>CSS</i>, and <i>JavaScript</i> (project <a href="[Link to Kochwelt project]">Kochwelt</a>), deepened API requests (<a href="[Link to PokeDex project]">PokeDex</a>), and expanded my JavaScript skills in <i>database queries</i> and real-time displays (<a href="[Link to Join project]">Join</a>).
              <i>Object-oriented programming</i> was implemented with the browser game <a href="[Link to Yureis Wish project]">Yureis Wish</a>.
              Currently, I am focusing on <i>Angular</i> and <i>Tailwind</i>, where component-based programming particularly fascinates me due to its flexibility, as also evident on this <a href="[Link to Portfolio Website]">portfolio website</a>.<br><br>
              The possibilities of the web browser are so vast: Nowadays, extensive applications can be developed within it, enabling many areas of application and mobile work.</p>`
    }
  }

  ngOnInit(){
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang
    })
  }

  ngOnDestroy(){
    this.langSubscription?.unsubscribe();
  }
}
