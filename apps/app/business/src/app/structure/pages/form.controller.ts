import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { PageController } from './page.controller';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from '../../../../../../../libs/app/common/decorators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'base-component',
  template: ``,
})
@AutoUnsubscribe
export abstract class FormController<T> extends PageController {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSave: EventEmitter<T> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCancel: EventEmitter<T> = new EventEmitter();

  private route: ActivatedRoute;

  protected fb: FormBuilder;

  public id: any;

  constructor(override injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.fb = injector.get(FormBuilder);
  }

  protected override destroySubscriptions() {
    this.onSave.unsubscribe();
    this.onCancel.unsubscribe();
    return super.destroySubscriptions();
  }

  protected getId(paramName: string = 'id') {
    return this.id || this.route.snapshot.paramMap.get(paramName);
  }

  abstract override getData(): void;

  /**
   * closes the modal
   * */
  protected closeModal() {}
}
