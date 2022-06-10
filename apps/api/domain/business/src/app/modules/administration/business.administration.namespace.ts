// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Administration {
  export const PATH = 'administration';

  export function resolePath(path: string) {
    return [PATH, path].join('/');
  }
  export function resolePaths(path: string[]) {
    return [PATH, ...path].join('/');
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace User {
    export const UserInvitationPATH = 'user/invitation';
    export const UserPATH = 'user';
    export const RolePATH = 'role';
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Business {
    export const Path = 'business';
  }
}
