export interface MenuItem {
  title: string;
  children: MenuItem[];
  path?: string;
  icon?: string;
}
export interface MenuEnv{
  api:{url:string}
  company:{url:string}
}