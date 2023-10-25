export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
}

export interface IUserCreate extends Pick<IUser, 'email' | 'passwordHash'> {}
export interface IUserPublic extends Omit<IUser, 'password'> {}
