import { Component, effect, inject, signal, ViewChild, ElementRef, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { interval, Subscription } from 'rxjs';
import { ProjectComponent } from './project/project/project.component';
import { elementHeight, Language } from '../types';
import { ScreenResService } from '../../service/screen-res/screen-res.service';
import { SectionHeightDirective } from '../../directives/section-height.directive';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-section-project',
  imports: [RouterModule, ProjectComponent, CommonModule],
  templateUrl: './section-project.component.html',
  styleUrl: './section-project.component.css',
  hostDirectives: [{
    directive: SectionHeightDirective,
    outputs: ['height'],
    inputs: ['sectionid']
  }]
})

export class SectionProjectComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  private screenService = inject(ScreenResService)
  screenSubscription: Subscription | undefined;
  screenWidth = signal<number>(0)

  private deviceService = inject(DeviceDetectorService)

  slideProjects: ReturnType<typeof setInterval> = setInterval(() => { })

  firstLoad: boolean = false;

  @ViewChild('flexcontainer') flexcontainer!: ElementRef
  @ViewChild('activeelement') activeelement!: ElementRef
  @ViewChildren('projectelement') projectelement!: QueryList<ElementRef>

  setProjectActive = signal<number>(0)
  activeID: number = 0;
  mouseover: boolean = false;

  currentLang: Language = "de";

  flexRect: {
    left: number,
    right: number,
    width: number,
  } = {
      left: 0,
      right: 0,
      width: 0,
    };

  targetRect: {
    left: number,
    right: number,
    width: number
  }[] = [];

  project: {
    list: {
      name: string,
      icon: string,
      id: string,
      active: boolean,
      warning: boolean,
    }[]
  } = {
      list: [
        {
          name: "Yurei's Wish",
          icon: "/img/yureis-wish-icon.png",
          id: 'yurei',
          active: true,
          warning: true,
        },
        // {
        //   name: "Join",
        //   icon: "/img/favicon_logo_join.png",
        //   id: 'join',
        //   active: false,
        // },
        // {
        //   name: "Portfolio",
        //   icon: "/icons/website-logo.webp",
        //   id: 'join',
        //   active: false,
        // },
      ]
    };

  changeActivBackground = effect(() => {
    this.activeID = this.setProjectActive()
    this.setBackgroundWidth()
  })

  setBackgroundWidth() {
    if (this.targetRect.length > 0) {
      let translateX = `translateX(${this.targetRect[this.activeID].left - this.flexRect.left}px)`
      let width = `${this.targetRect[this.activeID].width}px`
      if (this.activeelement) {
        this.activeelement.nativeElement.style.transform = translateX
        this.activeelement.nativeElement.style.width = width
      }
    }
  }

  changeActivBackgroundSize = effect(() => {
    let width = this.screenWidth()
    if (this.firstLoad === true) {
      if (width <= 640) {
        this.getWidthAndPosition()
        this.setBackgroundWidth()
      }
      if (width >= 641) {
        this.getWidthAndPosition()
        this.setBackgroundWidth()
      }
    }
  })

  constructor() {
    effect(() => {
      this.removeActive(this.setProjectActive())
    })
  }

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.screenSubscription = this.screenService.screenW$.subscribe(width => {
      this.screenWidth.set(width)
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getWidthAndPosition()
      this.firstLoad = true;
      this.startSlideProjects()
    }, 100)
  }

  startSlideProjects() {
    this.slideProjects = setInterval(() => {
      if (!this.mouseover && !this.deviceService.isMobile()) {
        let index = (this.setProjectActive() + 1) % this.project.list.length
        this.setProjectActive.set(index)
      }
    }, 10000)
  }

  getWidthAndPosition() {
    this.flexRect.left = this.flexcontainer.nativeElement.getBoundingClientRect().left
    this.flexRect.right = this.flexcontainer.nativeElement.getBoundingClientRect().right
    this.flexRect.width = this.flexcontainer.nativeElement.getBoundingClientRect().width

    this.targetRect = []

    this.projectelement.forEach((e) => {
      let rect = e.nativeElement.getBoundingClientRect()
      let eobj = {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        id: e.nativeElement.id
      }
      this.targetRect.push(eobj)
    })
  }

  removeActive(currentId: number) {
    for (let index = 0; index < this.project.list.length; index++) {
      const element = this.project.list[index];
      if (index === currentId) {
        element.active = true
      } else {
        element.active = false
      }
    }
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe()
    this.screenSubscription?.unsubscribe()
    clearInterval(this.slideProjects)
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }
}
