import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, fromEvent, mergeMap, iif, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollYServiceService {

  private currentScrollY = new BehaviorSubject<number>(0);
  public currentScrollY$: Observable<number> = this.currentScrollY.asObservable();

  private scrollYchache: number = 0;

  private scrollSubscription: Subscription | undefined;

  
  aboutme: boolean = false;
  skill: boolean = false;
  project: boolean = false;
  contact: boolean = false;

  public modalOpen: boolean = false;

  constructor() {
    this.subscribeScroll()
  }

  // observeElement(element: ElementRef, elementid:string) {

  //   const observer = new IntersectionObserver(entries => {

  //     entries.forEach(entry => {

  //       if (entry.isIntersecting) {

  //         console.log(true + elementid)
  //         console.log(entry.intersectionRatio)

  //       } else {
  //         console.log(false + elementid)
  //       }

  //     });

  //   }, { threshold: 0.40 });

  //   observer.observe(element.nativeElement);

  // }

  subscribeScroll() {
    this.scrollSubscription = fromEvent(window, 'scroll').pipe(
      map(() => window.scrollY),
      tap(scrollY => {
        if (!this.modalOpen) {
          this.scrollYchache = scrollY
        }
      }),
      mergeMap(scrollY =>
        iif(
          () => !this.modalOpen,
          of(scrollY),
          of(this.scrollYchache)
        )
      )
    ).subscribe(x => {
      this.currentScrollY.next(x)
    })
  }

  ngOnDestory() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

}
