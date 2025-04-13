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

}
