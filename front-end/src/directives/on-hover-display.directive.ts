import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appOnHoverDisplay]'
})
export class OnHoverDisplayDirective implements OnInit{
  private originalDisplay: any;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const childDiv = this.element.nativeElement.querySelector('div');
    if (childDiv) {
      this.originalDisplay = childDiv.style.display;
    }
  }

  @HostListener("mouseenter")
  onMouseEnter(){
    const childDiv = this.element.nativeElement.querySelector('div');
    if (childDiv) {
      childDiv.style.display = 'block'; 
    }
  }
  
  @HostListener("mouseleave")
  onMouseLeave(){
    const childDiv = this.element.nativeElement.querySelector('div');
    if (childDiv) {
      childDiv.style.display = this.originalDisplay;
    }
  }
}
