import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, startWith, debounceTime, distinctUntilChanged, Observable, Subscription, map, fromEvent } from 'rxjs';


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

  private currentScrollY = new BehaviorSubject<number>(0);
  public currentScrollY$: Observable<number> = this.currentScrollY.asObservable();

  private _screenSizeW = new BehaviorSubject<number>(0);
  public screenSizeW$: number = 0;

  private _screenSizeH = new BehaviorSubject<number>(0);
  public screenSizeH$: number = 0;

  private scrollSubscription: Subscription | undefined;
  private resizeSubscription: Subscription | undefined;

  private screenResRange: ScreenResRange = {
    "mobileScreen": {
      max_w: 440,
      max_h: 940,

      min_w: 360,
      min_h: 640
    },

    "tabletScreen": {
      max_w: 1024,
      max_h: 1366,

      min_w: 768,
      min_h: 1024
    },

    "laptopScreen": {
      max_w: 1440,
      max_h: 1024,

      min_w: 1366,
      min_h: 768
    },

    "desktopScreen": {
      min_w: 1920,
      min_h: 1080,

      max_w: 2560,
      max_h: 1440
    }
  }

  private _device = new BehaviorSubject<string>('')
  public device$: Observable<string> = this._device.asObservable();

  constructor() {
    this.subscribeScroll()
    this.initScreenSize()
  }

  subscribeScroll() {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        debounceTime(1),
        map(() => window.scrollY),
        distinctUntilChanged()
      )
      .subscribe(scrollY => {
        this.currentScrollY.next(scrollY)
      })
  }

  initScreenSize() {
         this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100), // Nur nach einer Pause der Größenänderung aktualisieren
        map(() => ({ w: window.screen.width, h: window.screen.height })),
        startWith({ w: window.screen.width, h: window.screen.height }), // Emittiert sofort die aktuelle Fenstergröße
        distinctUntilChanged((prev, curr) => prev.w === curr.w && prev.h === curr.h) // Nur bei tatsächlicher Änderung
      )
         .subscribe(({ w, h }) => {
        // Aktualisiere die internen BehaviorSubjects für Breite und Höhe
        this._screenSizeW.next(w);
        this._screenSizeH.next(h);

        // BESTIMME UND SETZE DEN GERÄTETYP ERST HIER, NACHDEM DIE GRÖSSEN BEKANNT SIND
        const determinedDevice = this.returnDevice(w, h);
        this._device.next(determinedDevice);
      });
  }

  returnDevice(w: number, h: number) {
    if (this.returnStringDevice(w, h, "mobileScreen")) {
      return "mobile"
    } else if (this.returnStringDevice(w, h, "tabletScreen")) {
      return "tablet"
    } else if (this.returnStringDevice(w, h, "laptopScreen")) {
      return "laptop"
    } else if (this.returnStringDevice(w, h, "desktopScreen")) {
      return "desktop"
    } else {
      return "otherScreen"
    }
  }

  returnStringDevice(w: number, h: number, device: string) {
    let screenDetails = this.screenResRange[device]

    if (device === "mobileScreen") {
      console.log(w <= screenDetails.max_w)
      console.log(w >= screenDetails.min_w)

      console.log(h >= screenDetails.min_h)
      console.log(h <= screenDetails.max_h)

      console.log(w)
      console.log(screenDetails.max_w)
    }

    if (w <= screenDetails.max_w && w >= screenDetails.min_w &&
      h <= screenDetails.max_h && h >= screenDetails.min_h) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe();
    }
  }
}
