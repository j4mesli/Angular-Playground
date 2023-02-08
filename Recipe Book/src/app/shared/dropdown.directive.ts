import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // attaches 'open' class to element that this directive is bound to when 'isOpen' is true
  @HostBinding('class.open') isOpen = false;
  // closes dropdown if user clicks outside the dropdown selector itself
  @HostListener('document:click', ['$event']) toggleOpen = (event: Event) => this.isOpen = this.elem.nativeElement.contains(event.target) ? !this.isOpen : false;
  constructor(
    private elem: ElementRef,
  ) {}
}