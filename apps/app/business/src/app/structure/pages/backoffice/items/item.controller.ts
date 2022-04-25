import { Component, Injector } from '@angular/core';
import { PageController } from '../../page.controller';

@Component({
  selector: 'base-item-component',
  template: ``,
})
export abstract class ItemController<T> extends PageController {
  protected constructor(override injector: Injector) {
    super(injector);
  }
}
