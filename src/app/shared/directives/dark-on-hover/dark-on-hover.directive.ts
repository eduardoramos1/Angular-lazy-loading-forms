import {
  Directive,
  ElementRef,
  HostListener,
  Renderer,
  Input
} from "@angular/core";

// para usar a diretiva como uma propriedade dentro de uma tag, é necessa definir a diretiva usando colchetes
@Directive({
  selector: "[apDarkenOnHover]"
})
export class DarkenOnHoverDirective {
  constructor(private el: ElementRef, private render: Renderer) {}

  @Input() brightness = "70%";

  // diz qual o evento em que a directive vai disparar
  @HostListener("mouseover")
  darkenOn() {
    //   permite mexer com o elemento do dom
    this.render.setElementStyle(
      this.el.nativeElement,
      "filter",
      `brightness(${this.brightness})`
    );
  }

  @HostListener("mouseleave")
  darkenOff() {
    this.render.setElementStyle(
      this.el.nativeElement,
      "filter",
      "brightness(100%)"
    );
  }
}
