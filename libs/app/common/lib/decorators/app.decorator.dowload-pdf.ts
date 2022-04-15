import { Observable, tap } from 'rxjs';

export function OpenAsPDF() {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const result: Observable<Blob> = originalMethod.apply(this, args);
      result
        .pipe(
          tap(({ body, headers }: any) => {
            let data: any = body;
            if (headers.get('fileName')) {
              let fileName = headers.get('fileName') || 'cv';
              const blob = new Blob([data], { type: 'application/pdf' });
              var uri = URL.createObjectURL(blob);

              const aLink = document.createElement('a');
              aLink.href = uri;
              aLink.download = fileName + '.pdf';

              document.body.appendChild(aLink);
              aLink.click();
              setTimeout(() => document.body.removeChild(aLink));
            } else {
              const blob = new Blob([data], { type: 'application/pdf' });
              window.open(
                URL.createObjectURL(blob),
                '_blank',
                'width=1000, height=800, title=CV'
              );
            }
          })
        )
        .subscribe();
    };

    return descriptor;
  };
}
