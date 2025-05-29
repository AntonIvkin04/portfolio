import { Injectable } from '@angular/core';
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
  private _screenSizeW = new BehaviorSubject<number>(0);
  public screenSizeW$: number = 0;

  private _screenSizeH = new BehaviorSubject<number>(0);
  public screenSizeH$: number = 0;

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
    this.initScreenSize()
  }

  initScreenSize() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        map(() => ({ w: window.screen.width, h: window.screen.height })),
        startWith({ w: window.screen.width, h: window.screen.height }),
        distinctUntilChanged((prev, curr) => prev.w === curr.w && prev.h === curr.h)
      )
      .subscribe(({ w, h }) => {
        this._screenSizeW.next(w);
        this._screenSizeH.next(h);

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

    if (w <= screenDetails.max_w && w >= screenDetails.min_w &&
      h <= screenDetails.max_h && h >= screenDetails.min_h) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
