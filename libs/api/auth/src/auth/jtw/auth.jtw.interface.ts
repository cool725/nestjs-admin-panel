export interface IAuthJtwPayload {
  id?: any; // LoginId
  sub: any; // <UserId|Subject>
  uuId: string; // Device ID
  authCreatedAt: number; // User creation year
  iat: number;
  exp: number;
  scopes: string[];
}
