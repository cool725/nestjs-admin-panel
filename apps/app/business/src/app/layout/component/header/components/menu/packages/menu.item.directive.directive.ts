import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

function elementInViewport(el: HTMLElement) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = <any>el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}
function elementInViewport2(el: HTMLElement) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = <any>el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

@Directive({
  selector: '[movitMenuItemDirective]',
})
export class MenuItemDirectiveDirective implements OnDestroy, OnInit {
  @Input() inline = false;

  observer = this.inline
    ? null
    : new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) =>
          this.onStateChange(entry.intersectionRatio > 0)
        );
      }, {});

  constructor(private elRef: ElementRef) {}

  onStateChange(state: boolean) {

  }

  ngOnInit() {
    this.listen();
  }

  ngOnDestroy() {
    this.destroy();
  }

  listen() {
    if (this.observer) this.observer.observe(this.elRef.nativeElement);
  }

  destroy() {
    if (this.observer) this.observer.unobserve(this.elRef.nativeElement);
  }
}
