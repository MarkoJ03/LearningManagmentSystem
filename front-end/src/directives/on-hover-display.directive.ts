import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appOnHoverDisplay]'
})
export class OnHoverDisplayDirective {
  private static openDiv: HTMLElement | null = null; 
  private isVisible = false;
  private childDiv: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.childDiv = this.el.nativeElement.querySelector('div');
    if (this.childDiv) {
      this.renderer.setStyle(this.childDiv, 'display', 'none');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f0f0');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }

  @HostListener('click')
  onClick() {
    //Za zatvaranje prethodnog
    if (OnHoverDisplayDirective.openDiv && OnHoverDisplayDirective.openDiv !== this.childDiv) {
      this.renderer.setStyle(OnHoverDisplayDirective.openDiv, 'display', 'none');
    }

   
    this.isVisible = !this.isVisible;
    const displayValue = this.isVisible ? 'block' : 'none';
    if (this.childDiv) {
      this.renderer.setStyle(this.childDiv, 'display', displayValue);
    }

    
    if (this.isVisible) {
      OnHoverDisplayDirective.openDiv = this.childDiv;
    } else {
      OnHoverDisplayDirective.openDiv = null;
    }
  }
}
