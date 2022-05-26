interface User {
  avatar?: string;

  gender?: string;

  firstName: string;

  lastName: string;

  phone?: string;

  birthDay?: string;
}

export interface AuthUser extends User {

  userId: string;


  email: string;

  host: string;

  password?: string;

  authCreatedAt: number; //year;

  validatePassword(password: string): Promise<boolean>

  setAuthCreatedAt(year: number): this

  setEmail(mail:string):this

  toJSON(): Record<string, AuthUser>

  initialise(data: Partial<this>, secure:boolean):this
}