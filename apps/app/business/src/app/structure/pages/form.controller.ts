import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { PageController } from './page.controller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'base-component',
  template: ``,
})
export abstract class FormController<T> extends PageController {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSave: EventEmitter<T> = new EventEmitter();

  private route: ActivatedRoute;

  constructor(override injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
  }

  protected getId(paramName: string = 'id') {
    return this.route.snapshot.paramMap.get(paramName);
  }

  abstract override getData(): void;
}
