import { Component, effect, inject, signal, ViewChild, ElementRef, ViewChildren, QueryList, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { single, Subscription } from 'rxjs';
import { ProjectComponent } from './project/project/project.component';
import { Language } from '../types';


@Component({
  selector: 'app-section-project',
  imports: [RouterModule, ProjectComponent, CommonModule],
  templateUrl: './section-project.component.html',
  styleUrl: './section-project.component.css'
})

export class SectionProjectComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  @ViewChild('flexcontainer') flexcontainer!: ElementRef
  @ViewChild('activeelement') activeelement!: ElementRef
  @ViewChildren('projectelement') projectelement!: QueryList<ElementRef>

  setProjectActive = signal<number>(0)

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
    }[]
  } = {
      list: [
        {
          name: "Yurei's Wish",
          icon: "/img/yureis-wish-icon.png",
          id: 'yurei',
          active: true,
        },
        {
          name: "Join",
          icon: "/img/favicon_logo_join.png",
          id: 'join',
          active: false,
        },
      ]
    };

  changeActivBackground = effect(() => {
    console.log(true)
    if (this.targetRect) {
      
      console.log(this.targetRect)
      console.log(this.targetRect[this.setProjectActive()])

      let translateX = `translateX(${this.targetRect[this.setProjectActive()].left - this.flexRect.left}px)`
      let width = `${this.targetRect[this.setProjectActive()].width}px`

      if (this.activeelement) {
        this.activeelement.nativeElement.style.transform = translateX
        this.activeelement.nativeElement.style.width = width
      }
    }

    // if (this.targetRect) {
    //   console.log(this.targetRect[this.setProjectActive()])
    //   console.log(this.setProjectActive())
    // }

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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.flexRect.left = this.flexcontainer.nativeElement.getBoundingClientRect().left
      this.flexRect.right = this.flexcontainer.nativeElement.getBoundingClientRect().right
      this.flexRect.width = this.flexcontainer.nativeElement.getBoundingClientRect().width
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
    }, 100)
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
  }

  darkMode() {
    if (document.documentElement.classList.contains('dark')) {
      return true
    } else {
      return false
    }
  }
}
