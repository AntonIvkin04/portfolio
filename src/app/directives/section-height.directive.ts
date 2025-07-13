import { Directive, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { elementHeight } from '../shared/types';

@Directive({
  selector: '[appSectionHeight]'
})
export class SectionHeightDirective {
  
  private elementRef = inject(ElementRef)
  @Output() height = new EventEmitter<elementHeight>();
  elementHeight!: elementHeight;

  @Input({ required: true}) sectionid!:string 

  constructor() { }

  ngAfterViewInit() {
    this.elementHeight = { section: this.sectionid, height: this.elementRef.nativeElement.offsetHeight }
    this.height.emit(this.elementHeight)
  }

}
