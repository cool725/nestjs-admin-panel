import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppNotifyService, LangService } from '@movit/app/common';
import { AutoUnsubscribe } from '@movit/app/decorators';

@Component({
  selector: 'base-component',
  template: ``,
})
@AutoUnsubscribe
export abstract class PageController {
  /*
  * Current session base url
  * when navigating to route ensure the path starts with the basePath
  * */
  public basePath = environment.company.url;

  /*
  * Array of subscriptions that need to be destoryed on page leave
  * */
  protected readonly subscriptions: Subscription[] = [];

  /*
  * Notify and Toaster
  * */
  private vNotify: AppNotifyService;

  /*
  * Will be replaced with
  * https://github.com/ngx-translate/core
  * */
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
    setTimeout(() => this.setTopBarInfo(), 200);
    /*
     this.subscriptions.push(
      this.dEmitter.register(EDataEmitterType.DataReload, () =>
        this.reloadData()
      )
    );
    **/
  }

  abstract getData(): void;

  protected reloadData() {
    this.getData();
  }

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
    return this.subscriptions.map((s) => s.unsubscribe());
  }

  protected setTopBarInfo(context: any = {}, t: TemplateRef<any> = this.topbar) {
    // todo: refactore and remove window scope
    if (t) (<any>window)['emitTemplate'](t.createEmbeddedView(context));
  }
}
