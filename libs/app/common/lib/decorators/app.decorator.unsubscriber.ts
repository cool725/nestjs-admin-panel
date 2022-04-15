export function AutoUnsubscribe(constructor: any = null): any {
  const { ngOnDestroy } = constructor.prototype;
  constructor.prototype.ngOnDestroy = function () {
    this.destroySubscriptions();
    ngOnDestroy &&
      typeof ngOnDestroy === 'function' &&
      ngOnDestroy.apply(this, arguments);
  };
}
