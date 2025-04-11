import { Component } from '@angular/core';
import { SectionHeroComponent } from '../../shared/section-hero/section-hero.component';
import { SectionProjectComponent } from '../../shared/section-project/section-project.component';
import { SectionSkillsComponent } from '../../shared/section-skills/section-skills.component';

@Component({
  selector: 'app-main-content',
  imports: [SectionHeroComponent, SectionProjectComponent, SectionSkillsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})

export class MainContentComponent {

}
