import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageController } from '../../page.controller';
import { Observable } from 'rxjs';

@Component({
  selector: 'base-item-component',
  template: ``,
})
export abstract class ItemController<T> extends PageController {
  constructor(override injector: Injector) {
    super(injector);
  }

  cancelModal(s: any) {
    s.next(null);
  }
}
