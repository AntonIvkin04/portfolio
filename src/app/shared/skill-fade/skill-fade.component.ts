import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-skill-fade',
  imports: [],
  templateUrl: './skill-fade.component.html',
  styleUrl: './skill-fade.component.css'
})
export class SkillFadeComponent {
  interval: ReturnType<typeof setInterval> = setInterval(() => { })

  @ViewChild('img') img!: ElementRef<HTMLElement>

  index: number = 0;
  array: string[] = ['icon/angular.svg','icon/vue-svgrepo-com.svg', 'icon/react-svgrepo-com.svg', 'icon/svelte-icon-svgrepo-com.svg']

  ngAfterViewInit() {
    this.interval = setInterval(() => {
      this.img.nativeElement.classList.add('fade-out')
      setTimeout(() => {
        this.img.nativeElement.classList.add('fade-in')
        this.img.nativeElement.classList.remove('fade-out')
        this.index = (this.index + 1) % this.array.length
      }, 200)
      this.img.nativeElement.classList.remove('fade-in')
    }, 5000)

  }
}
