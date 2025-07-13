import { Component, computed, effect, input, InputSignal, ViewChildren, QueryList, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Language } from '../../../types';
import { ScreenResService } from '../../../../service/screen-res/screen-res.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentProjectIndex = input()
  currentLang: InputSignal<Language> = input.required<Language>()

  private screenSer = inject(ScreenResService);
  screenSubscription: Subscription | undefined;

  screenWSignal = signal<number>(0)

  @ViewChildren('textcontainer') textcontainers!: QueryList<ElementRef>;
  @ViewChildren('articels') articels!: QueryList<ElementRef>;
  @ViewChild('techicons') techicons!: ElementRef

  setPulesAnimationOnChange = effect(() => {
    this.currentProjectIndex();

    this.techicons?.nativeElement.classList.add('animateswitch')

    this.articels?.forEach((e) => {
      e.nativeElement.classList.add('animateswitch')

      setTimeout(() => {
        e.nativeElement.classList.remove('animateswitch')
        e.nativeElement.classList.remove('animateswitch')
      }, 450)
    })
    setTimeout(() => this.techicons.nativeElement.classList.remove('animateswitch'), 450)
  })

  currentProject = computed(() => {
    return this.currentProjectIndex() === 0 ? {
      name: "Yurei's Wish",
      date: '2022',
      demo_pic: 'projects/yureis-demo.webp',
      description: {
        de: 'Yurei ist gefangen in der Geisterwelt. Um wieder zurück zu gelangen, muss sich durch die Gegner und Oni Kämpfen. Dafür stehen Ihr Fähigkeiten zur Verfügung. Yureis Wish ist ein 2D Pixel Art Canva Browser Game, erstellt in Javascript mithilfe von Klassen.',
        en: "Yurei is trapped in the spirit world. To return, she must fight her way through enemies and Oni. She has abilities at her disposal for this. Yurei's Wish is a 2D pixel art canvas browser game, created in JavaScript using classes.",
      },
      organisation: {
        de: 'Diese Projekt wurde alleine mit Unterstützung der Developer Akadmie GmbH erstellt. Die Assets wurden selbständig ausgesucht',
        en: "This project was created independently with the support of Developer Akademie GmbH. The assets were selected autonomously."
      },
      learn_goal: {
        de: 'Das Ziel dieses Projekts, war es, ein besseres Gefühl für Objektorientiertes Programmieren und Klassen in Javascript',
        en: 'The goal of this project was to gain a better understanding of Object-Oriented Programming and classes in JavaScript.',
      },
      demo_link: '',
      github_link: '',
      tech_stack: ['html', 'javascript']
    } :
      this.currentProjectIndex() === 1 ? {
        name: 'Join',
        date: '2022',
        demo_pic: 'projects/join-demo.webp',
        description: {
          de: 'Tasks erstellen, verschieben, erledigen ✅. Join ist ein Kanbanboard welches eine Kontaktliste beinhaltet und somit ideal für das organsieren deines Teams ist. Das Projekt wurde mit einem Team aus drei Personen erstellt.',
          en: "Create tasks, move them, complete them ✅. That's the core of Join, a Kanban board designed to simplify team collaboration. What makes Join stand out is its integrated contact list, making it ideal for organizing your team. This project was developed by a three-person team.",
        },
        organisation: {
          de: 'Das Projekt wurde in einem 3er Team erstellt. Meine Aufgabe war das Kanbanboard mit der Firebase implemention.',
          en: 'The project was built by a team of three. My task was the Kanban board with Firebase implementation.'
        },
        learn_goal: {
          de: '',
          en: '',
        },
        demo_link: '',
        github_link: '',
        tech_stack: ['html', 'css', 'javascript', 'firebase']
      } :
        this.currentProjectIndex() === 2 ? {
          name: 'Portfolio',
          date: '2025',
          demo_pic: 'projects/portfolio-demo.png',
          description: {
            de: 'Tasks erstellen, verschieben, erledigen ✅. Join ist ein Kanbanboard welches eine Kontaktliste beinhaltet und somit ideal für das organsieren deines Teams ist. Das Projekt wurde mit einem Team aus drei Personen erstellt.',
            en: "Create tasks, move them, complete them ✅. That's the core of Join, a Kanban board designed to simplify team collaboration. What makes Join stand out is its integrated contact list, making it ideal for organizing your team. This project was developed by a three-person team.",
          },
          organisation: {
            de: 'Das Projekt wurde in einem 3er Team erstellt. Meine Aufgabe war das Kanbanboard mit der Firebase implemention.',
            en: 'The project was built by a team of three. My task was the Kanban board with Firebase implementation.'
          },
          learn_goal: {
            de: '',
            en: '',
          },
          demo_link: '',
          github_link: '',
          tech_stack: ['angular', 'typescript', 'tailwind']
        } :
          {
            name: '',
            date: '',
            demo_pic: '',
            description: {
              de: '',
              en: '',
            },
            organisation: {
              de: '',
              en: ''
            },
            learn_goal: {
              de: '',
              en: '',
            },
            demo_link: '',
            github_link: '',
            tech_stack: []
          }
  })

  titel = computed(() => {
    return this.currentLang() === 'de' ? {
      desciription: 'Beschreibung',
      organisation: 'Organisation',
      learn_goal: 'Lernziel'
    } : {
      desciription: 'Description',
      organisation: 'Organisation',
      learn_goal: 'Learn goal'
    }
  })

  constructor() {

  }

  ngAfterViewInit() {
    // this.setElementHeight()
    this.screenSubscription = this.screenSer.screenW$.subscribe((w) => {
      this.screenWSignal.set(w)
    })
  }

  // setElementHeight = effect(() => {
  //   this.screenWSignal()
  //   // console.log('screen' + true)
  //   this.textcontainers?.forEach(e => {
  //     let articelElement = e.nativeElement.querySelector('.span') as HTMLElement
  //     // console.log(articelElement.offsetHeight)
  //     let elementHeight = e.nativeElement.offsetHeight
  //     e.nativeElement.style.height = `${elementHeight}px`;
  //   });
  // })

  // setElementHeight() {
  //   this.textcontainers.forEach(e => {
  //     let elementHeight = e.nativeElement.offsetHeight
  //     e.nativeElement.style.height = `${elementHeight}px`;
  //   });
  // }

  getTechSvgSrc(techicon: string) {
    return `icons/${techicon}.svg`
  }

  getLocalizedObj(objKey: 'description' | 'organisation' | 'learn_goal'): string {
    const lang = this.currentLang()
    return this.currentProject()[objKey][lang]
  }

}
