export namespace Settings {
  export const PATH = 'settings';

  export function resolePath(path: string) {
    return [PATH, path].join('/');
  }
  export function resolePaths(path: string[]) {
    return [PATH, ...path].join('/');
  }
  export namespace Locales {
    export const PATH = 'locales';
  }
}
