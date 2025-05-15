import { Component } from '@angular/core';
import { SectionHeroComponent } from '../../shared/section-hero/section-hero.component';
import { SectionProjectComponent } from '../../shared/section-project/section-project.component';
import { SectionSkillsComponent } from '../../shared/section-skills/section-skills.component';
import { SectionContactMeComponent } from '../../shared/section-contact-me/section-contact-me.component';


@Component({
  selector: 'app-main-content',
  imports: [SectionHeroComponent, SectionProjectComponent, SectionSkillsComponent, SectionContactMeComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})

export class MainContentComponent {
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    console.log('Element gescrollt!', element.scrollTop, element.scrollHeight, element.clientHeight);

    // Beispiel: Funktion aufrufen, wenn der Nutzer das Ende erreicht hat
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      console.log('Ende des Containers erreicht!');
    }
  }

  test(){
    console.log("test")
  }
}
