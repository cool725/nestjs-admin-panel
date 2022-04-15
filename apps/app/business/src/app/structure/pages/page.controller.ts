import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppNotifyService, LangService } from '@movit/app/common';
import { Table } from '../../../../../../../libs/app/common/lib/helper/helper.table.class';
import { AutoUnsubscribe } from '../../../../../../../libs/app/common/lib/decorators/app.decorator.unsubscriber';

@Component({
  selector: 'base-component',
  template: ``,
})
@AutoUnsubscribe
export abstract class PageController {
  public basePath = environment.company.url;

  protected readonly subscriptions: Subscription[] = [];

  private vNotify: AppNotifyService;

  readonly language: LangService;
  readonly defaultLanguageId: number;

  @ViewChild('topbar', { read: TemplateRef, static: false })
  readonly topbar: TemplateRef<any>;

  constructor(protected injector: Injector) {
    this.vNotify = injector.get(AppNotifyService);
    this.language = injector.get(LangService);
    this.defaultLanguageId = this.language.getDefaultLanguageId();
    this.init();
  }

  private init() {
    setTimeout(() => this.getData(), 0);
    setTimeout(() => this.setTopbarInfo(), 200);
    /*
     this.subscriptions.push(
      this.dEmitter.register(EDataEmitterType.DataReload, () =>
        this.reloadData()
      )
    );
    * */
  }

  setTopbarInfo(context: any = {}, t: TemplateRef<any> = this.topbar) {
    if (t) (<any>window)['emitTemplate'](t.createEmbeddedView(context));
  }

  protected reloadData() {
    this.getData();
  }
  abstract getData(): void;

  /**
   * Subscribes and pushes data to subject
   * */
  protected onLoadAndSetData<T>(
    api$: Observable<T>,
    subject: Subject<any>,
    cb: any = null
  ): void {
    const subscription = api$.subscribe((data) => {
      subject.next(cb ? cb(data) : data);
      setTimeout(() => subscription.unsubscribe(), 0);
    });
  }

  protected destroySubscriptions() {
    this.subscriptions.map((s) => s.unsubscribe());
  }
}
