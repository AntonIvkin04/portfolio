import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';
import { ProjectComponent } from './project/project/project.component';


@Component({
  selector: 'app-section-project',
  imports: [RouterModule, ProjectComponent, CommonModule],
  templateUrl: './section-project.component.html',
  styleUrl: './section-project.component.css'
})

export class SectionProjectComponent {
  private langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined

  setProjectActive = signal<number>(0)

  currentLang: string = '';

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
