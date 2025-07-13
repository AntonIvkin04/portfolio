import { Component, ElementRef, EventEmitter, inject, Output } from '@angular/core';
import { elementHeight } from '../../../shared/types';
import { SectionHeightDirective } from '../../../directives/section-height.directive';

@Component({
  selector: 'app-section-imprint',
  imports: [],
  templateUrl: './section-imprint.component.html',
  styleUrl: './section-imprint.component.css',
  hostDirectives: [{
    directive: SectionHeightDirective,
    outputs: ['height'],
    inputs: ['sectionid']
  }]
})
export class SectionImprintComponent {

  // private elementRef = inject(ElementRef)
  // @Output() height = new EventEmitter<elementHeight>();
  // elementHeight!: elementHeight;

  // ngAfterViewInit() {
  //   this.elementHeight = { section: 'imprint', height: this.elementRef.nativeElement.offsetHeight }
  //   this.height.emit(this.elementHeight)
  // }

}
