export namespace BackOffice {
  export const PATH = 'backoffice';

  export function resolePath(path: string) {
    return [PATH, path].join('/');
  }
  export function resolePaths(path: string[]) {
    return [PATH, ...path].join('/');
  }

  export namespace Sales {
    export const PATHBase = 'sales';
    export namespace Items {
      export const PATH = 'sales/items';
      export const PATHService = 'sales/items/service';
      export const PATHProduct = 'sales/items/product';
    }
  }
}
