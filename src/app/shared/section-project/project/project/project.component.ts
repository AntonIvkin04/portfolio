import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentProjectIndex = input()

  currentProject = computed(() => {
    return this.currentProjectIndex() === 0 ? { 
      name : "Yurei's Wish",
      date : '2022',
      demo_pic : 'projects/yureis-demo.webp',
      discription : {
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
    this.currentProjectIndex() === 1 ? { 
      name : 'Join',
      date : '2022',
      demo_pic : 'projects/join-demo.webp',
      discription : {
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
      discription : {
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
}
