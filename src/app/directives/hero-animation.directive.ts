import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeroAnimation]'
})
export class HeroAnimationDirective {
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)
  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.el.nativeElement.textContent.split(''))

    let textArray: string[] = this.el.nativeElement.textContent.split('')
    this.el.nativeElement.textContent = '';

    textArray.forEach(char => {
      const span = this.renderer.createElement('span')

      const textContent = char === ' ' ? '\u00A0' : char;
      this.renderer.setProperty(span, 'textContent', textContent);

       this.renderer.addClass(span, 'text-animation');

      this.renderer.appendChild(this.el.nativeElement, span);
    });
  }

}
