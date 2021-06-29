import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Sort } from '../utils/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: Array<any>;

  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortData(){
    
    //new sort object
    const sort = new Sort();
    //get reference of current clicked element
    const element = this.targetElem.nativeElement;
    //get in which order list should be sorted by default it should be
    // set to desc on element attribute
    const order = element.getAttribute("data-order");
    //get the property type specially set [data-type];
    const type = element.getAttribute("data-type");
    //get property name from element attribute
    const property = element.getAttribute("data-name");
    const arrow = element.getAttribute("data-arrow");
    if(order === "desc"){
      this.appSort.sort(sort.startSort(property, order, type, arrow));
      element.setAttribute("data-arrow", "bi bi-caret-up-fill");
      element.setAttribute("data-order", "asc");
    }else{
      this.appSort.sort(sort.startSort(property, order, type, arrow));
      element.setAttribute("data-arrow", "bi bi-caret-down-fill");
      element.setAttribute("data-order", "desc");
    }
    console.log( element.getAttribute("data-order"))
  }
}
