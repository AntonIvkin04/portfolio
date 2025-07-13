import { Component, inject } from '@angular/core';
import { NavigationService } from '../../service/navigation/navigation.service';
import { SectionImprintComponent } from "./section-imprint/section-imprint.component";
import { elementHeight } from '../../shared/types';

@Component({
  selector: 'app-imprint',
  imports: [SectionImprintComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css'
})
export class ImprintComponent {
  private navService = inject(NavigationService)

  navigationPoints: any = [
    {
      name: 'imprint',
      lang: {
        de: 'Impressum',
        en: 'Imprint'
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
