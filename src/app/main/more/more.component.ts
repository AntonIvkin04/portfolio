import { Component, ElementRef, inject, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { elementHeight, Language } from '../../shared/types';
import { NavigationService } from '../../service/navigation/navigation.service';
import { SectionComponent } from './section/section.component';
import { LanguageDecService } from '../../service/language/language-dec.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-more',
  imports: [SectionComponent],
  templateUrl: './more.component.html',
  styleUrl: './more.component.css'
})



export class MoreComponent {
  private navService = inject(NavigationService)
  private renderer = inject(Renderer2)
  langService = inject(LanguageDecService)
  langSubscription: Subscription | undefined
  currentLang:Language = 'de'

  navigationPoints: any = [
    {
      name: '2022',
      lang: {
        de: '2022',
        en: '2022'
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
      name: '2024',
      lang: {
        de: '2024',
        en: '2024'
      }
    },
    {
      name: '2025',
      lang: {
        de: '2025',
        en: '2025'
      }
    }
  ]

  description = {
    2022: {
      de: 'September 2022 begann ich meine Ausbildung als Kaufmann im E-Commerce.<br><br>Dort bekamm ich meine ersten Berührungspunkte mit dem Shopsystem Magento.<br>Ich pflegte unsere Produkte und setzte mithilfe des Content Management System erste eigene Seiten auf.',
      en: 'In September 2022, I started my apprenticeship as a merchant in e-commerce.<br><br>There, I had my first contact with the shop system Magento.<br>I maintained our products and created my first own pages using the content management system.',
    },
    2023: {
      de: '2023 vertiefte ich mein Wissen in der Webentwicklung und Shopsystemen immer mehr.<br><br>Mein Ausbildungsplatz bat mir hier die besten Möglichkeiten kleine Projekte, wie das automatsieren eines Newsletter-Gutscheins versands, umzusetzten<br><br>Mit engerer zusammenarbeit mit unseren Magenot-Entwicker waren meine ersten Einblicke in die Welt der Entwicklung gesetzt.',
      en: 'In 2023, I deepened my knowledge in web development and shop systems more and more.<br><br>My apprenticeship offered me the best opportunities here to implement small projects, such as automating the sending of newsletter vouchers.<br><br>Through closer collaboration with our Magento developers, my first insights into the world of development were set.',
    },
    2024: {
      de: '2024 begann ich den ersten Schritt in mein neues Kapitel der Entwicklung.<br><br>Ich meldete mich bei der Developer Akdamie für meinen ersten Frontend Kurs an und lernte ab da Javascirpt, Typescript und Angular.<br><br>Ich wusste aber auch schon, ich möchte noch mehr lernen.',
      en: 'In 2024, I took the first step into my new chapter of development.<br><br>I enrolled in the Developer Academy for my first frontend course and started learning JavaScript, TypeScript, and Angular from there.<br><br>But I already knew—I wanted to learn even more.',
    },
    2025: {
      de: 'Jetzt in 2025 verkürzte ich im Februar erfolgreich meine Ausbildung im Bereich E-Commerce.<br><br>Entschied mich aber im September die Fachhochschulreife in einem Jahr im BKFH1 zu erreichen.<br><br>Ich möchte die Mathematik ab nun besser verstehen und in meiner kommenden Zukunft einsetzten können.',
      en: 'Now in 2025, I successfully shortened my apprenticeship in e-commerce in February.<br><br>But in September, I decided to complete my advanced technical college entrance qualification within one year at the BKFH1.<br><br>I want to understand mathematics better from now on and be able to apply it in my future.',
    }

  }

  @ViewChildren('section') section!: QueryList<any>

  sectionHeights: elementHeight[] = [];

  ngAfterViewInit() {
    this.pushNavigationData()
    this.section.forEach(el => {
      this.observeElement(el.element, this.renderer, 'opacity')
    });
  }

  ngOnInit() {
    this.langSubscription = this.langService.lang$.subscribe(lang => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy() {
    this.navService.arrayNav.splice(0, this.navService.arrayNav.length)
    this.navService.arrayHeight.splice(0, this.navService.arrayHeight.length)
    this.langSubscription?.unsubscribe()
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

  observeElement(element: ElementRef, renderer: Renderer2, animationClass: string) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          renderer.addClass(element.nativeElement, animationClass);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(element.nativeElement);
  }
}
