import { Component, inject } from '@angular/core';
import { Section2025Component } from "./section-2025/section-2025.component";
import { elementHeight } from '../../shared/types';
import { NavigationService } from '../../service/navigation/navigation.service';
import { Section2023Component } from './section-2023/section-2023.component';
import { Section2022Component } from './section-2022/section-2022.component';
import { Section2024Component } from './section-2024/section-2024.component';

@Component({
  selector: 'app-more',
  imports: [Section2025Component,Section2024Component,Section2023Component,Section2022Component],
  templateUrl: './more.component.html',
  styleUrl: './more.component.css'
})

export class MoreComponent {
  private navService = inject(NavigationService)

  navigationPoints: any = [
    {
      name: '2025',
      lang: {
        de: '2025',
        en: '2025'
      }
    },
    {
      name: '2024',
      lang: {
        de: '2024',
        en: '2024'
      }
    },
    {
      name: '2023',
      lang: {
        de: '2023',
        en: '2023'
      }
    },
    {
      name: '2022',
      lang: {
        de: '2022',
        en: '2022'
      }
    }
  ]

  sectionHeights: elementHeight[] = [];

  ngAfterViewInit() {
    this.pushNavigationData()
  }

  ngOnDestroy() {
    this.navService.arrayNav.splice(0, this.navService.arrayNav.length)
    this.navService.arrayHeight.splice(0, this.navService.arrayHeight.length)
  }

  handleHeight(height: elementHeight) {
    this.sectionHeights.push(height)
  }

  pushNavigationData() {
    for (let i = 0; i < this.navigationPoints.length; i++) {
      const element = this.navigationPoints[i];
      this.navService.addDataNav(element)
    }

    for (let i = 0; i < this.sectionHeights.length; i++) {
      const element = this.sectionHeights[i];
      this.navService.addDataHeight(element)
    }
  }
}
