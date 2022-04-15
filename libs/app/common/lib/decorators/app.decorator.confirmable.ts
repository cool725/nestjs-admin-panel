export function Confirmable(options: { title: string }) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    const config: any = Object.assign(
      {
        title: 'Are you sure?',
      },
      options || {}
    );

    descriptor.value = async function (...args: any) {
      // ask for confirmation
      const confirmResult = confirm(config.title);
      if (confirmResult) {
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
