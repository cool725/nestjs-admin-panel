export namespace Finances {
  export const PATH = 'finances';

  export function resolePath(path: string) {
    return [PATH, path].join('/');
  }
  export function resolePaths(path: string[]) {
    return [PATH, ...path].join('/');
  }

  export namespace Settings {
    export const PATH = 'settings';
  }
}
