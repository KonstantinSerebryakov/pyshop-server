export interface IUser {
  id?: string;
  email: string;
  passwordHash?: string;
}

export interface IUserPublic extends Omit<IUser, 'passwordHash'> {}
export interface IUserUpdate extends Partial<Omit<IUser, 'id'>> {}
