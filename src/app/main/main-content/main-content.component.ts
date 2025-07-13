import { Component, inject, ViewChild, ElementRef, Output, ViewChildren, QueryList } from '@angular/core';
import { SectionHeroComponent } from '../../shared/section-hero/section-hero.component';
import { SectionProjectComponent } from '../../shared/section-project/section-project.component';
import { SectionSkillsComponent } from '../../shared/section-skills/section-skills.component';
import { SectionContactMeComponent } from '../../shared/section-contact-me/section-contact-me.component';
import { NavigationService } from '../../service/navigation/navigation.service';
import { elementHeight, navigation } from '../../shared/types';


@Component({
  selector: 'app-main-content',
  imports: [SectionHeroComponent, SectionProjectComponent, SectionSkillsComponent, SectionContactMeComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})



export class MainContentComponent {
  private navService = inject(NavigationService)
  @ViewChildren('section') section!: QueryList<ElementRef>

  navigationPoints:navigation[] = [
    {
      name: 'about',
      lang: {
        de: 'Über mich',
        en: 'About me'
      }
    },
    {
      name: 'project',
      lang: {
        de: 'Projekte',
        en: 'Projects'
      }
    },
    {
      name: 'skill',
      lang: {
        de: 'Fähigkeiten',
        en: 'Skills'
      }
    },
    {
      name: 'contact',
      lang: {
        de: 'Schreib mir!',
        en: 'Contact me!'
      }
    }
  ]

  sectionHeights:elementHeight[] = [];
  

  ngOnInit() {
    // this.pushNavigationData()
  }

  ngOnDestroy() {
    this.navService.arrayNav.splice(0, this.navService.arrayNav.length)
    this.navService.arrayHeight.splice(0, this.navService.arrayHeight.length)
  }

  ngAfterViewInit() {
    this.pushNavigationData()
    setTimeout(() => {
      console.log(this.sectionHeights)
    }, 1000);
  }

  handleHeight(height:elementHeight){
    this.sectionHeights.push(height)
  }

  pushNavigationData() {
    for (let i = 0; i < this.navigationPoints.length; i++) {
      const element = this.navigationPoints[i];
      this.navService.addDataNav(element)
    }

    for (let i = 0; i < this.sectionHeights.length; i++) {
      const element = this.sectionHeights[i];
      this.navService.addDataHeight(element)
    }

  }

  constructor() {
  }


}
