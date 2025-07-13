import { Injectable } from '@angular/core';
import { elementHeight, navigation } from '../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  arrayNav: navigation[] = []
  arrayHeight: elementHeight[] = []

  addDataNav(item: navigation): void {
    this.arrayNav.push(item);
  }

  addDataHeight(item: elementHeight): void {
    this.arrayHeight.push(item);
  }

  getArray(): navigation[] {
    return this.arrayNav;
  }

  ngOnDestroy() {
    this.arrayNav.splice(0, this.arrayNav.length)
  }

  constructor() {
    // setTimeout(() =>{
    //   this.arrayObj.push({
    //   name: 'project',
    //   lang:{
    //     de: 'Projekte',
    //     en: 'Projects'
    //   }
    // })
    // },1000)
  }
}
