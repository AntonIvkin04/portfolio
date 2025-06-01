import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { SectionHeroComponent } from '../../shared/section-hero/section-hero.component';
import { SectionProjectComponent } from '../../shared/section-project/section-project.component';
import { SectionSkillsComponent } from '../../shared/section-skills/section-skills.component';
import { SectionContactMeComponent } from '../../shared/section-contact-me/section-contact-me.component';
import { ScrollYServiceService } from '../../service/scroll-y/scroll-y-service.service';


@Component({
  selector: 'app-main-content',
  imports: [SectionHeroComponent, SectionProjectComponent, SectionSkillsComponent, SectionContactMeComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})



export class MainContentComponent {
  public scrollY = inject(ScrollYServiceService)

  @ViewChild('about', { read: ElementRef }) about!: ElementRef
  @ViewChild('project', { read: ElementRef }) project!: ElementRef
  @ViewChild('skill', { read: ElementRef }) skill!: ElementRef
  @ViewChild('contact', { read: ElementRef }) contact!: ElementRef

  constructor() {

    // this.scrollY.observeElement(this.about, 'about')
    // this.scrollY.observeElement(this.about, 'about')
  }

  ngAfterViewInit() {
    console.log(this.about.nativeElement)
    // this.scrollY.observeElement(this.about, 'about')
    // this.scrollY.observeElement(this.project, 'project')
    // this.scrollY.observeElement(this.skill, 'skill')
    // this.scrollY.observeElement(this.contact, 'contact')
  }

}
