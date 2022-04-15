export interface IAuthUser {
  userId: string;

  email: string;

  host: string;

  password: string;

  authCreatedAt: number;

  deleted?: boolean;
}
