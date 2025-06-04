import { Component, computed, input, InputSignal } from '@angular/core';
import { Language } from '../../../types';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentProjectIndex = input()
  currentLang: InputSignal<Language> = input.required<Language>()

  currentProject = computed(() => {
    return this.currentProjectIndex() === 0 ? { 
      name : "Yurei's Wish",
      date : '2022',
      demo_pic : 'projects/yureis-demo.webp',
      description : {
        de: 'Yurei ist gefangen in der Geisterwelt. Um wieder zurück zu gelangen, muss sich durch die Gegner und Oni Kämpfen. Dafür stehen Ihr Fähigkeiten zur Verfügung. Yureis Wish ist ein 2D Pixel Art Canva Browser Game, erstellt in Javascript mithilfe von Klassen.',
        en : "Yurei is trapped in the spirit world. To return, she must fight her way through enemies and Oni. She has abilities at her disposal for this. Yurei's Wish is a 2D pixel art canvas browser game, created in JavaScript using classes.",
      },
      organisation: {
        de : 'Diese Projekt wurde alleine mit Unterstützung der Developer Akadmie GmbH erstellt. Die Assets wurden selbständig ausgesucht',
        en : "This project was created independently with the support of Developer Akademie GmbH. The assets were selected autonomously."
      },
      learn_goal : {
        de : 'Das Ziel dieses Projekts, war es, ein besseres Gefühl für Objektorientiertes Programmieren und Klassen in Javascript',
        en : 'The goal of this project was to gain a better understanding of Object-Oriented Programming and classes in JavaScript.',
      },
      demo_link : '',
      github_link : '',
      tech_stack : ['html','javascript']
    } :
    this.currentProjectIndex() === 1 ? { 
      name : 'Join',
      date : '2022',
      demo_pic : 'projects/join-demo.webp',
      description : {
        de: '',
        en : '',
      },
      organisation: {
        de : '',
        en : ''
      },
      learn_goal : {
        de : '',
        en : '',
      },
      demo_link : '',
      github_link : '',
      tech_stack : []
    } :
    { 
      name : '',
      date : '',
      demo_pic : '',
      description : {
        de: '',
        en : '',
      },
      organisation: {
        de : '',
        en : ''
      },
      learn_goal : {
        de : '',
        en : '',
      },
      demo_link : '',
      github_link : '',
      tech_stack : []
    }
  })

  constructor() {

  }

  getLocalizedObj(objKey: 'description' | 'organisation' | 'learn_goal'): string {
    const lang = this.currentLang()
    return this.currentProject()[objKey][lang]
  }
}
