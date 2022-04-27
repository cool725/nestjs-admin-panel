export function AutoUnsubscribe(constructor: any = null): any {
  const { ngOnDestroy } = constructor.prototype;
  constructor.prototype.ngOnDestroy = function () {
    this.destroySubscriptions();
    ngOnDestroy &&
      typeof ngOnDestroy === 'function' &&
      // eslint-disable-next-line prefer-rest-params
      ngOnDestroy.apply(this, arguments);
  };
}
