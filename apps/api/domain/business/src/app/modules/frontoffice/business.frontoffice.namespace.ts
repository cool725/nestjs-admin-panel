export namespace FrontOffice {
  export const PATH = 'frontoffice';

  export function resolePath(path: string) {
    return [PATH, path].join('/');
  }
  export function resolePaths(path: string[]) {
    return [PATH, ...path].join('/');
  }

  export namespace CashSystem {
    export const PATH = 'cashsystem';
    export const PATHSettings = PATH+'/settings';
    export const PATHItems = PATH+'/items';
    export const PATHProfiles = PATH+'/profiles';
  }

  export namespace Agenda {
    export const PATH = 'agenda';
  }

  export namespace Profiles {
    export const PATH = 'profiles';
  }
}
