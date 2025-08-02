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
