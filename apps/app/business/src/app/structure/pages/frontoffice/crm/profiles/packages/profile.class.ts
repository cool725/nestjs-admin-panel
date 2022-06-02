export class Profile {
  profileId: number;
  companyId: number;

  gender: 'C' | 'M' | 'W';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  birthDay: string;

  priceClassId: number;

  static create(params?: Partial<Profile>) {
    return Object.assign(new Profile(), params || {});
  }
}