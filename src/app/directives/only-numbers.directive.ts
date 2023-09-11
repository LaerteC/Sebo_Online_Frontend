import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * The directive restricts input to only numbers.
 */
@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control?.patchValue(value.replace(/[^0-9]/g, ''))
  }

}
