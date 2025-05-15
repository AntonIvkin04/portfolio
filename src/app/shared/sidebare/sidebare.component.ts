import { Component, ElementRef, inject, ViewChildren, QueryList } from '@angular/core';
import { ScreenResService } from '../../screen-res.service';


@Component({
  selector: 'app-sidebare',
  imports: [],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  private screenRes = inject(ScreenResService)
  
  @ViewChildren('spans') spans!: QueryList<ElementRef>;
  @ViewChildren('under') unders!: QueryList<ElementRef>;
  spanWidthCache: number[] = []
  undersIndex: number = 0;

  aboutme: boolean = false;
  skill: boolean = false;
  project: boolean = false;
  contact: boolean = false;

  constructor(){
   
  }

  ngOnInit() {
    this.screenRes.currentScrollY$.subscribe((x) => {
      this.markCurrentSection(x)
      console.log(x)
    })

    setTimeout(() => {
      this.screenRes.device$.subscribe((x) => {
        console.log(x)
      })
    }, 500)
  }

  ngAfterViewInit() {
    this.spans.forEach((e) => {
      this.spanWidthCache.push(e.nativeElement.offsetWidth)
    })

    this.unders.forEach((e) =>{
      e.nativeElement.style.width = `${this.spanWidthCache[this.undersIndex]}px`;
      this.undersIndex++;
    })

    this.undersIndex = 0;
  }

  markCurrentSection(x: number) {
    if (x <= 480) {
      this.aboutme = true;

      this.skill = false;
      this.project = false;
      this.contact = false;
    }

    if (x >= 480) {
      this.skill = true;

      this.aboutme = false;
      this.project = false;
      this.contact = false;
    }

    if (x >= 1280) {
      this.project = true;

      this.aboutme = false;
      this.skill = false;
      this.contact = false;
    }


    if (x >= 1980) {
      this.contact = true;

      this.project = false;
      this.skill = false;
      this.aboutme = false;
    }
  }

}
