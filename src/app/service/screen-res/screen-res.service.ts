import { Injectable } from '@angular/core';
import { BehaviorSubject, startWith, debounceTime, distinctUntilChanged, Observable, Subscription, map, fromEvent, tap } from 'rxjs';

interface ScreenDetails {
  max_w: number;
  max_h: number;
  min_w: number;
  min_h: number;
}

interface ScreenResRange {
  [key: string]: ScreenDetails;
}

@Injectable({
  providedIn: 'root'
})

export class ScreenResService {
  private _screenSizeW = new BehaviorSubject<number>(0);
  public screenSizeW$: number = 0;
  public screenW$: Observable<number> = this._screenSizeW.asObservable();

  private _screenSizeH = new BehaviorSubject<number>(0);
  public screenSizeH$: number = 0;

  private resizeSubscription: Subscription | undefined;

  private _device = new BehaviorSubject<string>('')
  public device$: Observable<string> = this._device.asObservable();

  constructor() {
    this.initScreenSize()
  }

  initScreenSize() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map(() => ({ w: window.innerWidth, h: window.innerHeight })),
        startWith({ w: window.innerWidth, h: window.innerHeight }),
        distinctUntilChanged((prev, curr) => prev.w === curr.w && prev.h === curr.h)
      )
      .subscribe(({ w, h }) => {
        this._screenSizeW.next(w);
        this._screenSizeH.next(h);
      });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
