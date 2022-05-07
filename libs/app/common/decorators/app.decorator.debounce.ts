export function Debounce(timeout: number) {
  // store timeout value for cancel the timeout
  let timeoutRef: any = null;

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // store original function for future use
    const original = descriptor.value;

    // override original function body
    descriptor.value = function debounce(...args: any) {
      // clear previous timeout
      clearTimeout(timeoutRef);

      // sechudle timer
      timeoutRef = setTimeout(() => {
        // call original function
        original.apply(this, args);
      }, timeout);
    };

    // return descriptor with new value
    return descriptor;
  };
}
